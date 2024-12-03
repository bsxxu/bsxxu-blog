import redis from '@/lib/redis';
import { checkObjectExists, genPresignedUrl } from '@/lib/s3';
import { baseProcedure, createTRPCRouter } from '@/lib/trpc/init';
import { BizError, ErrorCode } from '@/service/error';
import { z } from 'zod';
import { getAllPostsKeys, getImageKey } from '../../common/post';

export const post = createTRPCRouter({
  getImageUrl: baseProcedure
    .input(z.object({ name: z.string(), postKey: z.string() }))
    .query(async ({ input }) => {
      const key = getImageKey(input.postKey, input.name);
      const isExist = await checkObjectExists(key);
      if (!isExist) throw new BizError(ErrorCode.NotFound, '文件不存在');
      const cacheUrl = await redis.get(key);
      if (cacheUrl) return cacheUrl;
      const expire = 600;
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
