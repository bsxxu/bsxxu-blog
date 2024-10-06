import { getHeadings } from '@/lib/mdx';
import * as motion from 'framer-motion/client';
import MDXRemote from './mdx-rsc';
import Toc from './toc';

export default async function Article({ content }: { content: string }) {
  return (
    <div className="flex justify-center p-5 gap-5">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <MDXRemote content={content} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Toc headings={await getHeadings(content)} />
      </motion.div>
    </div>
  );
}
