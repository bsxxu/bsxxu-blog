'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { comments } from '@/lib/db/schema';

export async function createComment(postKey: string, content: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized, please login first.');
  await db.insert(comments).values({
    userId: session.user.id,
    postKey: postKey,
    content: content,
  });
}

export async function replyComment(commentId: string, content: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized, please login first.');
  const comment = await db.query.comments.findFirst({
    where: (comments, { eq }) => eq(comments.id, commentId),
  });
  if (!comment) throw new Error('Comment to be replied not found.');
  await db.insert(comments).values({
    userId: session.user.id,
    isRoot: false,
    replyToId: commentId,
    rootCommentId: comment.isRoot ? comment.id : comment.rootCommentId,
    postKey: comment.postKey,
    content: content,
  });
}
