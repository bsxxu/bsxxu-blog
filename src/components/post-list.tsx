'use client';

import { getAllPost } from '@/lib/mdx';
import PostCard from './post-card';
import SideMenu from './side-menu';
import { useMemo, useState } from 'react';
import * as Separator from '@radix-ui/react-separator';
import { timeFormat } from '@/utils/common';
import Link from 'next/link';
import AnimateView from './animate-view';

export default function PostList({
  posts,
}: {
  posts: ReturnType<typeof getAllPost>;
}) {
  const [isComplex, setComplex] = useState(true);
  const [newToOld, setNewToOld] = useState(true);

  useMemo(() => {
    newToOld
      ? posts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
      : posts.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
  }, [newToOld, posts]);

  return (
    <div className="mx-auto max-w-2xl flex justify-center gap-3">
      <div className="space-y-5 pb-10 w-full">
        {isComplex ? (
          posts.map(p => (
            <PostCard key={p.title} metadata={p} offset={50} delay={0} />
          ))
        ) : (
          <div className="flex">
            <Separator.Root className="w-[1.5px] bg-ft-minor/50" />
            <ul>
              {posts.map(p => (
                <AnimateView
                  as="li"
                  className="leading-disc relative right-[6px] flex items-center"
                  key={p.title}
                  motionProps={{
                    initial: {
                      opacity: 0,
                      y: 50,
                    },
                    whileInView: {
                      opacity: 1,
                      y: 0,
                    },
                    transition: {
                      duration: 0.5,
                      ease: 'easeInOut',
                    },
                    viewport: {
                      once: true,
                    },
                  }}
                >
                  <span className="absolute -translate-x-[70px] text-xs text-ft-minor">
                    {timeFormat(p.date, 'DD/MM/YYYY')}
                  </span>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="hover:translate-x-4 transition-transform duration-200 hover:text-ft-strong"
                  >
                    {p.title}
                  </Link>
                </AnimateView>
              ))}
            </ul>
          </div>
        )}
      </div>
      <SideMenu
        setComplex={setComplex}
        isComplex={isComplex}
        setNewToOld={setNewToOld}
        posts={posts}
      />
    </div>
  );
}
