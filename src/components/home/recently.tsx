import { getAllPost } from '@/lib/mdx';
import AnimateView from '../animate-view';
import WatchMore from '../watch-more';
import PostCard from '../post-card';
import Link from 'next/link';

//TODO 整合
export default async function Recently() {
  const posts = await getAllPost().slice(0, 3);
  return (
    <AnimateView
      as="div"
      className="relative min-h-screen w-full py-24 px-5 md:px-32 space-y-3"
      motionProps={{
        initial: {
          y: 50,
          opacity: 0,
        },
        whileInView: {
          y: 0,
          opacity: 1,
        },
        transition: {
          duration: 0.5,
          delay: 0.5,
          ease: 'easeOut',
        },
        viewport: {
          once: true,
        },
      }}
    >
      <div className="text-center font-semibold mb-5 text-2xl">最近动态</div>
      {posts.map((p, idx) => (
        <PostCard key={p.title} metadata={p} offset={(idx + 1) * 100} />
      ))}
      <div className="text-center font-semibold py-3">
        <Link
          href="/blog"
          className="p-2 hover:bg-bk-minor transition-colors rounded-md border border-bk-minor"
        >
          More..
        </Link>
      </div>
      <WatchMore />
    </AnimateView>
  );
}
