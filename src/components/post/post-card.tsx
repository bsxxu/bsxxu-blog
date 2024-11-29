import type { PostDataWithoutContent } from '@/service/type/post';
import * as motion from 'framer-motion/client';
import Link from 'next/link';
import { memo } from 'react';
import DownToTopView from '../motion/down-to-top-view';

function PostCard({
  metadata,
  offset = 0,
  delay = 0.7,
}: {
  metadata: any;
  offset?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="p-4 space-y-3 rounded-xl border border-muted relative hover:bg-muted transition-colors"
      initial={{
        opacity: 0,
        x: -offset,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: delay,
        duration: 0.5,
        ease: 'easeInOut',
      }}
      viewport={{
        once: true,
      }}
    >
      <div className="font-semibold text-lg line-clamp-1">{metadata.title}</div>
      <div className="text-sm line-clamp-2">{metadata.description}</div>
      <div className="text-xs text-muted-foreground">
        <span>{metadata.date}</span>
        <span>{metadata.tags?.join('·')}</span>
      </div>
      <Link
        href={`/post/${metadata.key}`}
        className="absolute right-3 bottom-3 flex items-center transition-colors hover:text-muted-foreground"
      >
        <span className="i-ri-arrow-right-s-fill" />
        阅读
      </Link>
    </motion.div>
  );
}

export default memo(PostCard);

export function PostCardN({ data }: { data: PostDataWithoutContent }) {
  return (
    <DownToTopView>
      <div className="flex">
        <div>{data.title}</div>
        <div>{data.date}</div>
      </div>
    </DownToTopView>
  );
}
