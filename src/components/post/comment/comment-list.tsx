'use client';

import CommonLoading from '@/components/common/loading';
import trpc from '@/lib/trpc/client';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import React from 'react';
import { CommentItem } from './comment-item';
import CommentSkeleton from './comment-skeleton';
import ReplyList from './reply-list';

export default function CommentList({ postKey }: { postKey: string }) {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = trpc.comment.getRootCommentsByPage.useInfiniteQuery(
    {
      pageSize: 10,
      postKey,
    },
    {
      initialCursor: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    },
  );

  const { scrollYProgress } = useScroll();
  useMotionValueEvent(
    scrollYProgress,
    'change',
    (v) => v >= 0.98 && hasNextPage && !isFetchingNextPage && fetchNextPage(),
  );

  if (error)
    return (
      <div className="flex items-center justify-center h-52 mx-auto">
        ( ´•̥̥̥ω•̥̥̥` ) 诶？好像出错了，等这个家伙慢慢修吧...
      </div>
    );

  const dataList = data?.pages?.flatMap((d) => d.result);

  return (
    <div className="space-y-5 mx-5 mt-8">
      {dataList?.map((comment) => (
        <React.Fragment key={comment.id}>
          <CommentItem type="root" comment={comment} />
          <ReplyList rootComment={comment} />
        </React.Fragment>
      ))}
      {isLoading && <CommentSkeleton />}
      {isFetchingNextPage && (
        <div className="relative mt-16">
          <CommonLoading />
        </div>
      )}
    </div>
  );
}
