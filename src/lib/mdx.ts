import path from 'node:path';
import fs from 'node:fs';
import matter from 'gray-matter';
import readingTime, { ReadTimeResults } from 'reading-time';
import remarkHeadings, { Heading } from '@vcarl/remark-headings';
import { remark } from 'remark';

export type PostMetadata = {
  title: string;
  date: string;
  tags?: string[];
  description?: string;
  lastModified?: string;
  readingTime?: ReadTimeResults;
};

const postsDir = path.join(process.cwd(), 'src', 'posts');

export function readMDXFile(path: string) {
  const raw = fs.readFileSync(path, 'utf-8');
  const { content, data } = matter(raw);

  return {
    content: content,
    metadata: {
      ...data,
      readingTime: readingTime(content),
    } as PostMetadata,
  };
}

export function getAllPost() {
  const files = fs
    .readdirSync(postsDir)
    .filter(name => name.endsWith('.md') || name.endsWith('.mdx'));

  return files
    .map(slug => ({
      ...readMDXFile(path.join(postsDir, slug)).metadata,
      slug,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string) {
  return readMDXFile(path.join(postsDir, slug));
}

export async function getHeadings(content: string) {
  const result = await remark().use(remarkHeadings).process(content);
  return (result.data.headings ?? []) as Heading[];
}
