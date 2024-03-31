import { compile, run, RunOptions } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-dev-runtime';
import remarkGithubAlerts from 'remark-github-alerts';

import 'remark-github-alerts/styles/github-base.css';
import 'remark-github-alerts/styles/github-colors-light.css';

export default async function MDXRemote({ content }: { content: string }) {
  const compiledMdx = String(
    await compile(content, {
      outputFormat: 'function-body',
      development: true,
      remarkPlugins: [remarkGithubAlerts],
    }),
  );

  const Content = (await run(compiledMdx, runtime as RunOptions)).default;

  return <Content />;
}
