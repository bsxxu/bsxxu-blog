import redis from '@/lib/redis';
import { genPresignedUrl } from '@/lib/s3';
import { baseProcedure, createTRPCRouter } from '@/lib/trpc/init';
import { z } from 'zod';

export const getImageKey = (name: string) => `images/${name}.webp`;

export const post = createTRPCRouter({
  getImageUrl: baseProcedure.input(z.string()).query(async ({ input }) => {
    const key = getImageKey(input);
    const cacheUrl = await redis.get(key);
    if (cacheUrl) return cacheUrl;
    const expire = 3600;
    const url = await genPresignedUrl(key, expire);
    await redis.setEx(key, expire, url);
    return url;
  }),
});
