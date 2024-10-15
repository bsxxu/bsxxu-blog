import { compileAndRun } from '@/lib/mdx';
import mdxComponents from '../mdx';

export default async function MDXRemote({ content }: { content: string }) {
  const Content = await compileAndRun(content);

  return (
    <article className="prose max-w-3xl w-full">
      <Content components={mdxComponents} />
    </article>
  );
}
