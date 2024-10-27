import { getHeadings } from '@/lib/mdx';
import * as motion from 'framer-motion/client';
import MDXRemote from './mdx-rsc';
import Toc from './toc';

export default async function Article({ content }: { content: string }) {
  return (
    <motion.div
      className="flex justify-center p-5 gap-5"
      initial={{ opacity: 0.5, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: 'easeOut' }}
    >
      <MDXRemote content={content} />
      <Toc headings={await getHeadings(content)} />
    </motion.div>
  );
}
