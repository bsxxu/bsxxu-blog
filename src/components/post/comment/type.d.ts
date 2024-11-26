import type trpc from '@/lib/trpc/client';

export type CommentType = Awaited<
  ReturnType<typeof trpc.comment.getRootCommentsByPage.query>
>[number];

export type ReplyType = Awaited<
  ReturnType<typeof trpc.comment.getReplyByPage.query>
>[number];
