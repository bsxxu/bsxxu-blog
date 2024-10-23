import 'server-only';

import path from 'node:path';
import type { PostDataWithoutContent } from '@/data/interfaces/post';
import { POSTS_INDEX } from '@/lib/constants';
import { POSTS_PATH } from '@/lib/env';
import { getAllPost, readMDXFile } from '@/lib/mdx';
import { searchClient } from '@/lib/search';
import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';

let isInit = false;

export async function getPost(key: string) {
  const res = await readMDXFile(path.join(POSTS_PATH, `${key}.mdx`));
  return res;
}

export async function getPostsGroupByYear() {
  await initSearch();
  const searchParams = {
    limit: 1000,
    attributesToRetrieve: [
      'key',
      'title',
      'tags',
      'description',
      'date',
      'timestamp',
      'readingTime',
    ],
    sort: ['timestamp:desc'],
  };
  const res = await searchClient
    .index(POSTS_INDEX)
    .search<PostDataWithoutContent, typeof searchParams>(null, searchParams);
  const yearMap = new Map<number, PostDataWithoutContent[]>();
  for (const p of res.hits) {
    const year = dayjs.unix(p.timestamp).year();
    yearMap.set(year, yearMap.get(year) ?? []);
    yearMap.get(year)?.push(p);
  }
  return Array.from(yearMap.entries());
}

export async function getAllPostsKeys() {
  await initSearch();
  let res = await searchClient
    .index(POSTS_INDEX)
    .getDocuments<{ key: string }>({
      fields: ['key'],
      limit: 50,
    });
  const keys = res.results.map((x) => x.key);
  while (res.results && res.results.length > 0) {
    res = await searchClient.index(POSTS_INDEX).getDocuments({
      fields: ['key'],
      limit: 50,
      offset: keys.length,
    });
    keys.push(...res.results.map((x) => x.key));
  }
  return keys;
}

const init = async () => {
  const tasks = [];
  tasks.push(
    await searchClient.createIndex(POSTS_INDEX, { primaryKey: 'key' }),
  );
  tasks.push(
    await searchClient
      .index(POSTS_INDEX)
      .updateSortableAttributes(['timestamp']),
  );
  const docs = await getAllPost();
  tasks.push(await searchClient.index(POSTS_INDEX).addDocuments(docs));
  while (true) {
    const ts = await Promise.all(
      tasks.map((t) => searchClient.getTask(t.taskUid)),
    );
    console.log(ts.map((x) => x.status));
    if (ts.some((t) => t.status === 'failed'))
      throw new Error('sync meilisearch failed');
    if (ts.some((t) => t.status === 'processing' || t.status === 'enqueued'))
      await new Promise((res) => setTimeout(res, 1000));
    else break;
  }
  isInit = true;
};

async function initSearch() {
  if (isInit) return;
  try {
    !(await searchClient.index(POSTS_INDEX).getRawInfo()) && (await init());
  } catch (e) {
    await init();
  }
}
