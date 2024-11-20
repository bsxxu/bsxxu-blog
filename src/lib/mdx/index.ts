import fs from 'node:fs';
import path from 'node:path';
import type { PostMetadata } from '@/data/interfaces/post';
import { type RunOptions, compile, run } from '@mdx-js/mdx';
import dayjs from 'dayjs';
import matter from 'gray-matter';
import * as devRuntime from 'react/jsx-dev-runtime';
import * as prodRuntime from 'react/jsx-runtime';
import readingTime from 'reading-time';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkGithubAlerts from 'remark-github-alerts';
import env from '../env';
import rehypeCode from './rehype-code';
import remarkHeading, { type TocHeading } from './remark-heading';

export async function readMDXFile(path: string) {
  const raw = await fs.promises.readFile(path, 'utf-8');
  const { content, data } = matter(raw) as unknown as {
    content: string;
    data: PostMetadata;
  };
  const timestamp = dayjs(data.date, 'YYYY-MM-DD HH:mm').unix();
  return {
    content,
    timestamp,
    readingTime: readingTime(content),
    ...data,
  };
}

export async function getAllPost() {
  const dir = env.POSTS_PATH;
  const files = await fs.promises.readdir(dir);
  const posts = files.filter(
    (name) => name.endsWith('.md') || name.endsWith('.mdx'),
  );
  const res = [];
  for (const p of posts) {
    res.push(readMDXFile(path.join(dir, p)));
  }
  return await Promise.all(res);
}

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
