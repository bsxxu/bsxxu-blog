import fs from 'node:fs';
import path from 'node:path';
import dayjs from 'dayjs';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { commonConfig } from '../configs/index.config';
import type { PostMetadata } from '../data/interfaces/post';

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
