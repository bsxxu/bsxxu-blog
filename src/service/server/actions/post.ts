'use server';

import fs from 'node:fs';
import path from 'node:path';
import env from '@/lib/env';
import { revalidatePath } from 'next/cache';

export async function savePost(key: string, post: File) {
  const filePath = path.join(env.POSTS_PATH, `${key}.mdx`);
  const isExist = fs.existsSync(filePath);
  if (isExist) throw new Error('文件已存在');
  const arrayBuffer = await post.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(filePath, buffer);
  revalidatePath('/post');
}
