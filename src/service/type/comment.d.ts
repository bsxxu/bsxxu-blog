import type { RouterOutputs } from '@/lib/trpc/router';

export type CommentType =
  RouterOutputs['comment']['getRootCommentsByPage']['result'][number];

export type ReplyType =
  RouterOutputs['comment']['getReplyByPage']['result'][number];
