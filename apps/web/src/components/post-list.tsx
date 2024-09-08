'use client';

import type { getAllPost } from '@/lib/mdx';
import { timeFormat } from '@/utils/common';
import * as Separator from '@radix-ui/react-separator';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import DownToTopView from './motion/down-to-top-view';
import PostCard from './post-card';
import SideMenu from './side-menu';

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
          posts.map((p) => (
            <PostCard key={p.title} metadata={p} offset={50} delay={0} />
          ))
        ) : (
          <div className="flex">
            <Separator.Root className="w-[1.5px] bg-ft-minor/50" />
            <ul>
              {posts.map((p) => (
                <DownToTopView
                  as="li"
                  className="leading-disc relative right-[6px] flex items-center"
                  key={p.title}
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
                </DownToTopView>
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
