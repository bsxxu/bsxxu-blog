import mdxComponents from './mdx';
import { complieAndRun } from '@/lib/mdx';

export default async function MDXRemote({ content }: { content: string }) {
  const Content = await complieAndRun(content);

  return (
    <article className="prose max-w-3xl">
      <Content components={mdxComponents} />;
    </article>
  );
}
