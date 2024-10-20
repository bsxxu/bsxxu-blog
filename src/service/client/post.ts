import { baseProcedure, createTRPCRouter } from '@/lib/trpc/init';
import { getAllPostsKeys } from '../server/post';

export const post = createTRPCRouter({
  getAllKeys: baseProcedure.query(async () => {
    return await getAllPostsKeys();
  }),
});
