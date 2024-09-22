import fs from 'node:fs';
import path from 'node:path';
import { commonConfig } from '@/configs/index.config';
import matter from 'gray-matter';

export async function readMDXFile(path: string) {
  const raw = await fs.promises.readFile(path, 'utf-8');
  const { content, data } = matter(raw);

  return {
    content,
    ...data,
  };
}

export async function getAllPost() {
  const dir = commonConfig.postsPath;
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
