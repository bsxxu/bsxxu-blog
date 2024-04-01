import MDXRemote from '@/components/mdx-rsc';
import Toc from '@/components/toc';
import { getHeadings, getPost } from '@/lib/mdx';

export default async function Post({ params }: { params: { slug: string } }) {
  const { content, metadata } = getPost(params.slug);
  return (
    <>
      <div className="text-center mt-32">{metadata.title}</div>
      <div>{metadata.readingTime?.minutes}</div>
      <div className="flex p-5 gap-5">
        <MDXRemote content={content} />
        <Toc headings={await getHeadings(content)} />
      </div>
    </>
  );
}
