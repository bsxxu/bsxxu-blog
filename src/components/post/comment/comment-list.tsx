'use client';

import CommonLoading from '@/components/common/loading';
import trpc from '@/lib/trpc/client';
import { useInfiniteQuery } from '@tanstack/react-query';
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
  } = useInfiniteQuery({
    queryKey: ['comments', postKey],
    queryFn: ({ pageParam }) =>
      trpc.comment.getRootCommentsByPage.query({
        page: pageParam,
        pageSize: 10,
        postKey,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.length < 10 ? null : lastPageParam + 1,
  });

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

  const dataList = data?.pages?.flat();

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
