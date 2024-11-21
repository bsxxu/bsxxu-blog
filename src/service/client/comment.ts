import { baseProcedure, createTRPCRouter } from '@/lib/trpc/init';

export const comment = createTRPCRouter({
  getCommentsByPage: baseProcedure.query(async () => {
    return [];
  }),
});
