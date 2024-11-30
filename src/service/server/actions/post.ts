'use server';

import { POSTS_INDEX } from '@/lib/constants';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { s3UploadFile } from '@/lib/s3';
import { searchClient } from '@/lib/search';
import { result } from '@/lib/utils';
import { getImageKey } from '@/service/client/post';
import { BizError, ErrorCode, transError } from '@/service/error';
import type { EnqueuedTask } from 'meilisearch';
import { revalidatePath } from 'next/cache';
import sharp from 'sharp';
import { getAllPosts, transData } from '../post';

export const savePost = async (key: string, post: File) => {
  try {
    const buffer = post.arrayBuffer();
    const text = new TextDecoder('utf-8').decode(await buffer);
    const isExist = await db.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.key, key),
    });
    if (isExist) throw new BizError(ErrorCode.HasExist, '文件已存在');
    await db.insert(posts).values({
      key,
      content: text,
    });
    await searchClient
      .index(POSTS_INDEX)
      .addDocuments([transData({ content: text })]);
    revalidatePath('/post');
    return result();
  } catch (e: any) {
    return result(e, '上传失败，请稍后再试');
  }
};

export async function uploadImages(files: FileList) {
  const webpFiles = await Promise.all(
    Array.from(files).map(async (f) => {
      const name = f.name.replace(/\.[^.]+$/, '');
      return {
        name,
        file: f,
        buffer: await sharp(await f.arrayBuffer())
          .webp()
          .toBuffer(),
      };
    }),
  );

  const failedFiles: { name: string; error: string }[] = [];
  await Promise.allSettled(
    webpFiles.map((data) =>
      s3UploadFile(getImageKey(data.name), data.buffer).catch((e: any) => {
        failedFiles.push({ name: data.file.name, error: e.message });
      }),
    ),
  );
  if (failedFiles.length) {
    throw new Error(`upload failed: ${failedFiles.join(', ')}`);
  }
}

export async function syncSearchEngine() {
  try {
    const tasks: EnqueuedTask[] = [];
    const indexList = await searchClient.getIndexes();
    if (!indexList.results.some((i) => i.uid === POSTS_INDEX)) {
      tasks.push(
        await searchClient.createIndex(POSTS_INDEX, { primaryKey: 'key' }),
      );
    }
    tasks.push(
      await searchClient
        .index(POSTS_INDEX)
        .updateSortableAttributes(['timestamp']),
    );
    const docs = await getAllPosts();
    tasks.push(await searchClient.index(POSTS_INDEX).addDocuments(docs));
    await new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          const ts = await Promise.all(
            tasks.map((t) => searchClient.getTask(t.taskUid)),
          );
          if (ts.some((t) => t.status === 'failed')) throw new Error();
          if (
            ts.some((t) => t.status === 'processing' || t.status === 'enqueued')
          ) {
            return;
          }
          clearInterval(interval);
          resolve(null);
          revalidatePath('/post');
        } catch (e) {
          clearInterval(interval);
          reject(new BizError(ErrorCode.ActionFailed, '搜索引擎同步失败'));
        }
      }, 1000);
    });
    return result();
  } catch (e: any) {
    return result(e, '搜索引擎同步失败，请稍后再试');
  }
}
