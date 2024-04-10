import AnimateView from '@/components/animate-view';
import MDXRemote from '@/components/mdx-rsc';
import PostMetadataSetter from '@/components/post-metadata-setter';
import Toc from '@/components/toc';
import { getHeadings, getPost } from '@/lib/mdx';

//TODO 标题下小字
export default async function Post({ params }: { params: { slug: string } }) {
  const { content, metadata } = getPost(params.slug);
  return (
    <PostMetadataSetter data={metadata}>
      <div className="text-center mt-32 mb-10 text-ft-strong text-3xl font-bold">
        {metadata.title}
      </div>
      <div>{metadata.readingTime?.minutes}</div>
      <div className="flex justify-center p-5 gap-5">
        <AnimateView
          as="div"
          motionProps={{ initial: { x: -50 }, animate: { x: 0 } }}
        >
          <MDXRemote content={content} />
        </AnimateView>
        <AnimateView
          as="div"
          motionProps={{ initial: { x: 50 }, animate: { x: 0 } }}
        >
          <Toc headings={await getHeadings(content)} />
        </AnimateView>
      </div>
    </PostMetadataSetter>
  );
}
