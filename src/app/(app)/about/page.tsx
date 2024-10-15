import Article from '@/components/post/article';
import PostMetadataSetter from '@/components/post/post-metadata-setter';
import ProgressBar from '@/components/post/progress-bar';
import { getPost } from '@/service/server/post';

export default async function About() {
  const res = await getPost('about-me');
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
