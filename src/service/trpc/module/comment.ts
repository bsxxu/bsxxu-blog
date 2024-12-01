import { db } from '@/lib/db';
import { baseProcedure, createTRPCRouter } from '@/lib/trpc/init';
import { z } from 'zod';

export const comment = createTRPCRouter({
  getRootCommentsByPage: baseProcedure
    .input(
      z.object({
        pageSize: z.number(),
        postKey: z.string(),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const { pageSize, cursor, postKey } = input;
      const page = cursor ?? 1;
      const result = await db.query.comments.findMany({
        offset: (page - 1) * pageSize,
        limit: pageSize + 1,
        where: (comments, { eq, and }) =>
          and(eq(comments.isRoot, true), eq(comments.postKey, postKey)),
        with: {
          user: true,
        },
      });
      if (result.length <= pageSize) return { result, nextPage: null };
      result.pop();
      return {
        result,
        nextPage: page + 1,
      };
    }),
  getReplyByPage: baseProcedure
    .input(
      z.object({
        pageSize: z.number(),
        rootCommentId: z.string(),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const { pageSize, cursor, rootCommentId } = input;
      const page = cursor ?? 1;
      const result = await db.query.comments.findMany({
        offset: (page - 1) * pageSize,
        limit: pageSize + 1,
        where: (comments, { eq }) => eq(comments.rootCommentId, rootCommentId),
        with: {
          user: true,
          replyToComment: {
            with: {
              user: true,
            },
          },
        },
      });
      if (result.length <= pageSize) return { result, nextPage: null };
      result.pop();
      return {
        result,
        nextPage: page + 1,
      };
    }),
});
