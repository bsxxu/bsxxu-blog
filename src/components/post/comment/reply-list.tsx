'use client';

import { Button } from '@/components/ui/button';
import trpc from '@/lib/trpc/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CommentItem } from './comment-item';
import type { CommentType } from './type';

export default function ReplyList({
  rootComment,
}: { rootComment: CommentType }) {
  const {
    data,
    error,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['comments', rootComment.id],
    queryFn: ({ pageParam }) =>
      trpc.comment.getReplyByPage.query({
        page: pageParam,
        pageSize: 4,
        rootCommentId: rootComment.id,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.length < 4 ? null : lastPageParam + 1,
  });

  const dataList = data?.pages?.flat();
  const isLoading = isPending || isFetchingNextPage;

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
            disabled={isLoading}
          >
            {isLoading ? (
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
