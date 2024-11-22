'use client';

import DefaultAvatar from '@/assets/default-avatar.png';
import trpc from '@/lib/trpc/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';

export default function CommentList({ postKey }: { postKey: string }) {
  const {
    data,
    error,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['comments', postKey],
    queryFn: ({ pageParam }) =>
      trpc.comment.getCommentsByPage.query({
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

  if (error) return <div>error</div>;

  const dataList = data?.pages?.flat();

  return (
    <div className="space-y-7 mx-5">
      {dataList?.map((d) => (
        <div key={d.id} className="flex items-start gap-3 group">
          <Image
            src={d.user.image ?? DefaultAvatar}
            alt="avatar"
            width={30}
            height={30}
            className="rounded-full"
          />
          <div className="text-sm overflow-auto space-y-2">
            <div className="space-x-3">
              <span>{d.user.name}</span>
              <span className="text-muted-foreground text-xs">
                {dayjs(d.createdAt)
                  .utcOffset(8)
                  .format('YYYY-MM-DD HH:mm:ss CST')}
              </span>
            </div>
            <div className="break-words">{d.content}</div>
          </div>
          <div className="i-ri-message-2-fill self-end invisible text-sm shrink-0 group-hover:visible hover:cursor-pointer transition-all" />
        </div>
      ))}
      {(isPending || isFetchingNextPage) && <div>Loading...</div>}
    </div>
  );
}
