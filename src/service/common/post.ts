import 'server-only';

import { POSTS_INDEX } from '@/lib/constants';
import { db } from '@/lib/db';
import { createPager, getObjectByPage } from '@/lib/s3';
import { searchClient } from '@/lib/search';
import { result } from '@/lib/utils';
import dayjs from 'dayjs';
import matter from 'gray-matter';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import readingTime from 'reading-time';
import { BizError, ErrorCode } from '../error';
import type { PostDataWithoutContent, PostMetadata } from '../type/post';

export const getImageKey = (postKey: string, name: string) =>
  `images/${postKey}/${name}.webp`;

export const getImagePrefix = (postKey?: string) =>
  postKey ? `images/${postKey}/` : 'images/';

export const transData = (queryResult: { content: string }) => {
  const { content, data } = matter(queryResult.content) as unknown as {
    content: string;
    data: PostMetadata;
  };
  const timestamp = dayjs(data.date).unix();
  return {
    content,
    timestamp,
    readingTime: readingTime(content),
    ...data,
  };
};

export async function getPost(key: string) {
  try {
    const dbData = await db.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.key, key),
    });
    if (!dbData) throw new BizError(ErrorCode.NotFound, '文章不存在');
    return result(transData(dbData));
  } catch (e: any) {
    return result(e, '获取文章失败，请稍后再试');
  }
}

export async function getPostsGroupByYear() {
  try {
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
    const indexList = await searchClient.getIndexes();
    if (!indexList.results.some((i) => i.uid === POSTS_INDEX))
      return result([]);
    const res = await searchClient
      .index(POSTS_INDEX)
      .search<PostDataWithoutContent, typeof searchParams>(null, searchParams);
    const yearMap = new Map<number, PostDataWithoutContent[]>();
    for (const p of res.hits) {
      const year = dayjs.unix(p.timestamp).year();
      yearMap.set(year, yearMap.get(year) ?? []);
      yearMap.get(year)?.push(p);
    }
    return result(Array.from(yearMap.entries()));
  } catch (e) {
    return result(e, '获取文章列表失败，请稍后再试');
  }
}

export async function getAllPostsKeys() {
  try {
    const ps = await db.query.posts.findMany({
      columns: { key: true },
    });
    return result(ps.map((p) => p.key));
  } catch (e) {
    return result(e, '获取所有文章key失败，请稍后再试');
  }
}

export async function getAllPosts() {
  const ps = await db.query.posts.findMany();
  return ps.map((p) => transData(p));
}

export const GET_IMAGE_KEY = 'get-image-key';
export async function getImagesByPage(
  page: number,
  pageSize: number,
  postKey?: string,
) {
  'use cache';
  cacheTag(GET_IMAGE_KEY);
  try {
    const prefix = getImagePrefix(postKey);
    const data = await getObjectByPage(page, pageSize, prefix);
    return result(data);
  } catch (e) {
    return result(e, '获取图片列表失败，请稍后再试');
  }
}
