import { trpcServer } from '@/lib/trpc/server';
import Link from 'next/link';
import DownToTopView from '../motion/down-to-top-view';
import PostCard from '../post/post-card';
import WatchMore from './watch-more';

//TODO 整合
export default async function Recently() {
  const posts = await trpcServer.posts.getPosts.query({ page: 1, pageSize: 3 });
  return (
    <DownToTopView
      delay={0.3}
      className="relative min-h-screen w-full py-24 px-5 md:px-32 space-y-3"
    >
      <div className="text-center font-semibold mb-5 text-2xl">最近动态</div>
      {posts.hits.map((p, idx) => (
        <PostCard key={p.title} metadata={p as any} offset={(idx + 1) * 100} />
      ))}
      <div className="text-center font-semibold py-3">
        <Link
          href="/blog"
          className="p-2 hover:bg-muted transition-colors rounded-md border border-muted"
        >
          More..
        </Link>
      </div>
      <WatchMore />
    </DownToTopView>
  );
}
