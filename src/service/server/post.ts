import 'server-only';

import path from 'node:path';
import type { PostData } from '@/data/interfaces/post';
import { PAGE_NUM, PAGE_SIZE, POSTS_INDEX } from '@/lib/constants';
import { POSTS_PATH } from '@/lib/env';
import { getAllPost, readMDXFile } from '@/lib/mdx';
import { searchClient } from '@/lib/search';

export async function getPost(key: string) {
  const res = await readMDXFile(path.join(POSTS_PATH, `${key}.mdx`));
  return res;
}

export async function getAllPostsKeys() {
  await checkIndex();
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

export async function getPostsByPage(
  page: number = PAGE_NUM,
  pageSize: number = PAGE_SIZE,
) {
  await checkIndex();
  const searchParams = {
    hitsPerPage: pageSize,
    page: page,
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
    .search<Omit<PostData, 'content'>, typeof searchParams>(null, searchParams);
  return res;
}

async function checkIndex() {
  try {
    const res = await searchClient.index(POSTS_INDEX).getRawInfo();
    if (!res) {
      await syncSearch();
    }
  } catch (e) {
    await syncSearch();
  }
}

export async function syncSearch() {
  await searchClient.index(POSTS_INDEX).deleteAllDocuments();
  await searchClient.deleteIndex(POSTS_INDEX);
  await searchClient.createIndex(POSTS_INDEX, { primaryKey: 'key' });
  await searchClient.index(POSTS_INDEX).updateSortableAttributes(['timestamp']);
  const docs = await getAllPost();
  await searchClient.index(POSTS_INDEX).addDocuments(docs);
}
