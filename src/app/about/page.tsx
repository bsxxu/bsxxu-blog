import Article from '@/components/article';
import PostMetadataSetter from '@/components/post-metadata-setter';
import { getPost } from '@/lib/mdx';

export default async function About() {
  const { content, metadata } = await getPost('about', 'about-me.mdx');
  return (
    <PostMetadataSetter data={metadata}>
      <div className="text-center mt-40 mb-10 text-ft-strong text-3xl font-bold">
        {metadata.title}
      </div>
      <Article content={content} />
    </PostMetadataSetter>
  );
}
