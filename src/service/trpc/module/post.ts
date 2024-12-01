import redis from '@/lib/redis';
import { genPresignedUrl } from '@/lib/s3';
import { baseProcedure, createTRPCRouter } from '@/lib/trpc/init';
import { z } from 'zod';
import { getAllPostsKeys, getImageKey } from '../../common/post';

export const post = createTRPCRouter({
  //TODO 检查空
  getImageUrl: baseProcedure
    .input(z.object({ name: z.string(), postKey: z.string() }))
    .query(async ({ input }) => {
      const key = getImageKey(input.postKey, input.name);
      const cacheUrl = await redis.get(key);
      if (cacheUrl) return cacheUrl;
      const expire = 3600;
      const url = await genPresignedUrl(key, expire);
      await redis.setEx(key, expire, url);
      return url;
    }),
  getAllPostsKeys: baseProcedure.query(async () => {
    const { error, result: keys } = await getAllPostsKeys();
    if (error) throw new Error(error.message);
    return keys;
  }),
});
