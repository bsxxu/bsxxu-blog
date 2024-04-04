'use client';

import { cm } from '@/utils/common';
import { Heading } from '@vcarl/remark-headings';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function Toc({ headings }: { headings: Heading[] }) {
  const hs = useMemo(() => {
    const min = Math.min(...headings.map(h => h.depth));
    return headings.map(h => ({ ...h, depth: h.depth - min }));
  }, [headings]);

  const [active, setActive] = useState('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current?.disconnect();
    const elements = hs.map(h => document.getElementById(h.value));

    observer.current = new IntersectionObserver(
      entries => {
        for (let e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id);
            break;
          }
        }
      },
      { rootMargin: '0% 0% -75% 0%' },
    );
    for (let e of elements) e && observer.current?.observe(e);

    return () => observer.current?.disconnect();
  }, [hs]);

  return (
    <div className="p-2 sticky top-20 min-w-44 self-start space-y-2 text-sm text-ft-minor">
      <div>Table of Contents</div>
      {hs.map(h => (
        <a
          id={h.value}
          key={h.value}
          href={`#${h.value}`}
          className={cm(
            'block whitespace-nowrap transition-all duration-500 hover:text-ft',
            {
              ['text-ft-strong translate-x-2']: active === h.value,
            },
          )}
          style={{ paddingLeft: h.depth * 20 }}
        >
          {h.value}
        </a>
      ))}
    </div>
  );
}
