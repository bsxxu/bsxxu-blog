import { db } from '@/lib/db';
import { baseProcedure, createTRPCRouter } from '@/lib/trpc/init';
import { z } from 'zod';

export const comment = createTRPCRouter({
  getRootCommentsByPage: baseProcedure
    .input(
      z.object({ page: z.number(), pageSize: z.number(), postKey: z.string() }),
    )
    .query(async ({ input }) => {
      return await db.query.comments.findMany({
        offset: (input.page - 1) * input.pageSize,
        limit: input.pageSize,
        where: (comments, { eq, and }) =>
          and(eq(comments.isRoot, true), eq(comments.postKey, input.postKey)),
        with: {
          user: true,
        },
      });
    }),
  getReplyByPage: baseProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number(),
        rootCommentId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await db.query.comments.findMany({
        offset: (input.page - 1) * input.pageSize,
        limit: input.pageSize,
        where: (comments, { eq }) =>
          eq(comments.rootCommentId, input.rootCommentId),
        with: {
          user: true,
          replyToComment: {
            with: {
              user: true,
            },
          },
        },
      });
    }),
});
