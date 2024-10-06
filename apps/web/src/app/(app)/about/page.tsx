import Article from '@/components/post/article';
import PostMetadataSetter from '@/components/post/post-metadata-setter';
import ProgressBar from '@/components/post/progress-bar';
import { trpcServer } from '@/lib/trpc/server';

export default async function About() {
  const res = await trpcServer.posts.getPostByKey.query('about-me');
  return (
    <>
      <PostMetadataSetter data={res} />
      <ProgressBar />
      <div className="text-center mt-40 mb-10 text-foreground text-3xl font-bold">
        {res.title}
      </div>
      <Article content={res.content} />
    </>
  );
}
