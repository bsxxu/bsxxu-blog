import { publicProcedure, router } from '../../server/trpc';

export const postsRouter = router({
  getPosts: publicProcedure.query(async () => {
    return null;
  }),
});
