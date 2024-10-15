'use client';

import BgDot from '@/components/common/bg-dot';
import BlogPagination from '@/components/post/blog-pagination';
import PostCard from '@/components/post/post-card';
import SideMenu from '@/components/post/side-menu';
import { NEW_FIRST } from '@/lib/constants';
import {
  type MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

export const fetchCache = 'default-no-store';

export interface PostListSearch {
  page?: string;
  pageSize?: string;
  sort?: string;
}

function T({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [300, -300]);

  return (
    <section className="flex mt-32 items-center">
      <div ref={ref} className=" bg-zinc-700 w-full" style={{ height: 600 }} />
      <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
    </section>
  );
}

export default function Test() {
  return (
    <>
      <BgDot />
      {Array(10)
        .fill(0)
        .map((_, idx) => (
          <T
            key={`${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              idx
            }`}
            id={idx}
          />
        ))}
    </>
  );
}

// export default async function AllPosts({
//   searchParams,
// }: { searchParams: PostListSearch }) {
//   const { page = 1, pageSize = 3, sort = NEW_FIRST } = searchParams;
//   const res = await trpcServer.posts.getPosts.query({
//     page,
//     pageSize,
//     sort: +sort,
//   });

//   return (
//     <>
//       <BgDot />
//       <div className="text-center mt-40 mb-10 text-3xl font-bold">
//         共{res.totalHits}篇文章
//       </div>
//       <div className="mx-auto max-w-2xl flex justify-center gap-3">
//         <div className="space-y-5 pb-10 w-full">
//           {res.hits.map((p) => (
//             <PostCard key={p.title} metadata={p as any} offset={50} delay={0} />
//           ))}
//         </div>
//         <SideMenu search={searchParams} />
//       </div>
//       <BlogPagination
//         currentPage={+(page ?? 1)}
//         pageSize={+(pageSize ?? 3)}
//         totalPage={res.totalPages}
//       />
//     </>
//   );
// }
