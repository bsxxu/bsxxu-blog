'use client';

import type { TocHeading } from '@/lib/mdx/remark-heading';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Separator } from '../ui/separator';
import BackTop from './back-top';

//TODO 用fox重构
export default function Toc({ headings }: { headings: TocHeading[] }) {
  const hs = useMemo(() => {
    const min = Math.min(...headings.map((h) => h.depth));
    return headings.map((h) => ({ ...h, depth: h.depth - min }));
  }, [headings]);

  const [active, setActive] = useState('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current?.disconnect();
    const headings = hs.map((h) => document.getElementById(h.slug));

    observer.current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id);
            break;
          }
        }
      },
      { rootMargin: '0% 0% -75% 0%' },
    );
    for (const h of headings) h && observer.current?.observe(h);

    return () => observer.current?.disconnect();
  }, [hs]);

  return (
    <div className="hidden p-2 sticky top-20 min-w-44 max-w-60 max-h-[80vh] self-start space-y-2 text-sm text-muted-foreground sm:block overflow-y-auto overflow-x-hidden">
      <div>Table of Contents</div>
      {hs.map((h) => (
        <a
          key={h.slug}
          href={`#${h.slug}`}
          className={cn(
            'block whitespace-nowrap transition-all duration-500 hover:text-accent-foreground truncate',
            {
              ['translate-x-2 text-accent-foreground']: active === h.slug,
            },
          )}
          style={{ paddingLeft: h.depth * 20 }}
        >
          {h.title}
        </a>
      ))}
      <Separator
        className="w-full h-[1px] bg-muted-foreground"
        orientation="horizontal"
      />
      <BackTop />
    </div>
  );
}
