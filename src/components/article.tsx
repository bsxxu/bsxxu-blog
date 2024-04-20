import { getHeadings } from '@/lib/mdx';
import AnimateView from './animate-view';
import MDXRemote from './mdx-rsc';
import Toc from './toc';

export default async function Article({ content }: { content: string }) {
  return (
    <div className="flex justify-center p-5 gap-5">
      <AnimateView
        as="div"
        className="w-full"
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
  );
}
