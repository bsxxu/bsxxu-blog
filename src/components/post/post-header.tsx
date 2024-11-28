'use client';

import type { PostMetadata } from '@/data/interfaces/post';
import { timeFormat } from '@/lib/utils';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { memo, useRef, useState } from 'react';

function PostHeader({ postMetadata }: { postMetadata: PostMetadata }) {
  const scrollRef = useRef(0);
  const { scrollY } = useScroll();
  const [y, setY] = useState(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest < scrollRef.current) {
      if (Math.abs(latest - scrollRef.current) > 100) {
        setY(0);
        scrollRef.current = latest;
      }
    } else {
      setY(-30);
      scrollRef.current = latest;
    }
  });

  return (
    <div className="fixed top-5  left-1/2 -translate-x-1/2  z-50">
      <motion.div
        animate={{ y, opacity: y === 0 ? 1 : 0 }}
        transition={{
          duration: 0.2,
          ease: 'easeInOut',
        }}
        className=" flex items-center gap-20 backdrop-blur-lg rounded-full px-5 py-2 border"
      >
        <div>
          <div className="font-semibold">{postMetadata.title}</div>
          <div className="text-xs text-muted-foreground">
            {timeFormat(postMetadata.date ?? '', 'YYYY-MM-DD')}
            <span className="pl-3">
              {postMetadata?.tags?.slice(0, 3).join(' · ') ?? ''}
            </span>
          </div>
        </div>
        <div>
          <div className="flex gap-3">
            <Link className="i-ri-arrow-go-back-fill" href="/post" />
            <button className="i-ri-heart-fill" />
            <button className="i-ri-share-line" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default memo(PostHeader);
