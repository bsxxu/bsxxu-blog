import { type RunOptions, compile, run } from '@mdx-js/mdx';
import * as devRuntime from 'react/jsx-dev-runtime';
import * as prodRuntime from 'react/jsx-runtime';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkGithubAlerts from 'remark-github-alerts';
import rehypeCode from './rehype-code';
import remarkHeading, { type TocHeading } from './remark-heading';

export async function getHeadings(content: string) {
  const result = await remark().use(remarkHeading).process(content);
  return (result.data.headings ?? []) as TocHeading[];
}

export async function compileAndRun(content: string) {
  const compiledMdx = String(
    //TODO vfile
    await compile(content, {
      outputFormat: 'function-body',
      development: process.env.NODE_ENV === 'development',
      remarkPlugins: [remarkHeading, remarkGithubAlerts as any, remarkGfm],
      rehypePlugins: [rehypeCode],
    }),
  );
  const runtime =
    process.env.NODE_ENV === 'development' ? devRuntime : prodRuntime;
  const res = (await run(compiledMdx, runtime as RunOptions)).default;
  return res;
}
