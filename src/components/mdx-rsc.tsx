import { compile, run, RunOptions } from '@mdx-js/mdx';
//TODO dev prod
import * as runtime from 'react/jsx-dev-runtime';
import remarkGithubAlerts from 'remark-github-alerts';
import remarkGfm from 'remark-gfm';
import rehypeShiki from '@shikijs/rehype';

import 'remark-github-alerts/styles/github-base.css';
import 'remark-github-alerts/styles/github-colors-light.css';
import Heading from './mdx/heading';

const components = {
  h1: (props: any) => <Heading as="h1" {...props} />,
  h2: (props: any) => <Heading as="h2" {...props} />,
  h3: (props: any) => <Heading as="h3" {...props} />,
  h4: (props: any) => <Heading as="h4" {...props} />,
  h5: (props: any) => <Heading as="h5" {...props} />,
  h6: (props: any) => <Heading as="h6" {...props} />,
};

export default async function MDXRemote({ content }: { content: string }) {
  const compiledMdx = String(
    await compile(content, {
      outputFormat: 'function-body',
      development: true,
      remarkPlugins: [remarkGithubAlerts, remarkGfm],
      //TODO day night switch
      rehypePlugins: [[rehypeShiki, { theme: 'dracula-soft' }]],
    }),
  );

  const Content = (await run(compiledMdx, runtime as RunOptions)).default;

  return (
    <article className="prose max-w-3xl">
      <Content components={components} />;
    </article>
  );
}
