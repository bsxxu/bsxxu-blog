'use client';

import type { PostDataWithoutContent } from '@/service/type/post';
import dayjs from 'dayjs';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import DownToTopView from '../motion/down-to-top-view';

export function PostCard({
  data,
  index,
}: { data: PostDataWithoutContent; index: number }) {
  return (
    <DownToTopView delay={index * 0.05}>
      <Link
        className="flex h-12 items-center gap-4 text-foreground/80 hover:text-foreground hover:translate-x-2  transition-all group"
        href={`/post/${data.key}`}
      >
        <div className="font-semibold">{data.title}</div>
        <div className="text-sm">
          {dayjs.unix(data.timestamp).format('MM-DD')}
        </div>
        <div className="i-ri-arrow-right-up-line opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    </DownToTopView>
  );
}

export default function PostList({
  data,
  year,
}: { data: PostDataWithoutContent[]; year: number }) {
  const h = (data.length - 1) * 50;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [h, 0]);

  return (
    <div className="flex relative">
      <div ref={ref} className="z-10 space-y-5">
        {data.map((p, idx) => (
          <PostCard key={p.key} data={p} index={idx} />
        ))}
      </div>
      <div className="-translate-x-10 absolute">
        <motion.div
          style={{ y }}
          className=" text-[100px] font-bold text-muted-foreground/10"
        >{`#${year}`}</motion.div>
      </div>
    </div>
  );
}
