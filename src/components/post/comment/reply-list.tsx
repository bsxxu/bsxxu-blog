'use client';

import { Button } from '@/components/ui/button';
import trpc from '@/lib/trpc/client';
import type { CommentType } from '@/service/type/comment';
import { CommentItem } from './comment-item';

export default function ReplyList({
  rootComment,
}: { rootComment: CommentType }) {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = trpc.comment.getReplyByPage.useInfiniteQuery(
    {
      pageSize: 4,
      rootCommentId: rootComment.id,
    },
    {
      initialCursor: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    },
  );

  const dataList = data?.pages?.flatMap((p) => p.result);
  const disable = isLoading || isFetchingNextPage;

  if (!dataList?.length) return null;

  return (
    <div className="space-y-5 mx-5">
      {dataList.map((comment) => (
        <CommentItem
          key={comment.id}
          type="reply"
          comment={comment}
          className="ml-7"
        />
      ))}
      {hasNextPage && !error && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={disable}
          >
            {disable ? (
              <span className="animate-spin i-ri-loader-5-fill" />
            ) : (
              '更多'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
