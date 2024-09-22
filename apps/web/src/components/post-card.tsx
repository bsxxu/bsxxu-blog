import type { PostMetadata } from '@/lib/mdx';
import Link from 'next/link';
import { memo } from 'react';
import { RiArrowRightSFill } from 'react-icons/ri';
import AnimateView from './animate-view';

function PostCard({
  metadata,
  offset = 0,
  delay = 0.7,
}: {
  metadata: PostMetadata & { slug: string };
  offset?: number;
  delay?: number;
}) {
  return (
    <AnimateView
      as="div"
      className="p-4 space-y-3 rounded-xl border border-muted relative hover:bg-muted transition-colors"
      motionProps={{
        initial: {
          opacity: 0,
          x: -offset,
        },
        whileInView: {
          opacity: 1,
          x: 0,
        },
        transition: {
          delay: delay,
          duration: 0.5,
          ease: 'easeInOut',
        },
        viewport: {
          once: true,
        },
      }}
    >
      <div className="font-semibold text-lg line-clamp-1">{metadata.title}</div>
      <div className="text-sm line-clamp-2">{metadata.description}</div>
      <div className="text-xs text-muted-foreground">
        <span>{metadata.date}</span>
        <span>{metadata.tags?.join('·')}</span>
      </div>
      <Link
        href={`/blog/${metadata.slug}`}
        className="absolute right-3 bottom-3 flex items-center transition-colors hover:text-muted-foreground"
      >
        <RiArrowRightSFill />
        阅读
      </Link>
    </AnimateView>
  );
}

export default memo(PostCard);
