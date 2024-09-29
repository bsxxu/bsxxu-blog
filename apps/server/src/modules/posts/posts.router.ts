import path from 'node:path';
import z from 'zod';
import { commonConfig } from '../../configs/index.config';
import type { PostData } from '../../data/interfaces/post';
import { PAGE_NUM, PAGE_SIZE, POSTS_INDEX } from '../../lib/constants';
import { searchClient } from '../../lib/search';
import { readMDXFile } from '../../lib/utils';
import { publicProcedure, router } from '../../server/trpc';

export const postsRouter = router({
  getPosts: publicProcedure
    .input(
      z.optional(
        z.object({
          page: z.optional(z.string().or(z.number())),
          pageSize: z.optional(z.string().or(z.number())),
        }),
      ),
    )
    .query(async (opts) => {
      const { page = PAGE_NUM, pageSize = PAGE_SIZE } = opts.input ?? {};
      const res = await searchClient
        .index(POSTS_INDEX)
        .search<
          Omit<PostData, 'content'>,
          { page: number; hitsPerPage: number; sort: string[] }
        >(null, {
          hitsPerPage: +pageSize,
          page: +page,
          sort: ['timestamp:desc'],
        });
      return res;
    }),
  getPostByKey: publicProcedure.input(z.string()).query(async (opts) => {
    const key = opts.input;
    const res = await readMDXFile(
      path.join(commonConfig.postsPath, `${key}.mdx`),
    );
    return res;
  }),
  getAllPostsKey: publicProcedure.query(async () => {
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
  }),
});
