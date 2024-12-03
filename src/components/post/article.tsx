import { compileAndRun, getHeadings } from '@/lib/mdx';
import * as motion from 'framer-motion/client';
import { getMdxComponents } from '../mdx';
import Toc from './toc';

export default async function Article({
  content,
  postKey,
}: {
  content: string;
  postKey: string;
}) {
  const Content = await compileAndRun(content);

  return (
    <motion.div
      className="flex justify-center p-5 gap-5"
      initial={{ opacity: 0.5, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: 'easeOut' }}
    >
      <article className="prose max-w-3xl w-full">
        <Content components={getMdxComponents(postKey)} />
      </article>
      <Toc headings={await getHeadings(content)} />
    </motion.div>
  );
}
