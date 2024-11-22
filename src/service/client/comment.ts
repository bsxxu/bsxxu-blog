import { db } from '@/lib/db';
import { baseProcedure, createTRPCRouter } from '@/lib/trpc/init';
import { z } from 'zod';

export const comment = createTRPCRouter({
  getCommentsByPage: baseProcedure
    .input(
      z.object({ page: z.number(), pageSize: z.number(), postKey: z.string() }),
    )
    .query(
      async ({ input }) =>
        await db.query.comments.findMany({
          offset: (input.page - 1) * input.pageSize,
          limit: input.pageSize,
          where: (comments, { eq, and }) =>
            and(eq(comments.isRoot, true), eq(comments.postKey, input.postKey)),
          with: {
            user: true,
            descendantComments: {
              with: {
                user: true,
                replyToComment: true,
              },
            },
          },
        }),
    ),
});
