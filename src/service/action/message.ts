'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { messages } from '@/lib/db/schema';
import { result } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function leaveMessage(content: string) {
  try {
    const session = await auth();
    if (!session?.user?.id)
      throw new Error('Unauthorized, please login first.');
    await db.insert(messages).values({
      userId: session.user.id,
      content: content,
    });
    revalidatePath('/guestbook');
    return result();
  } catch (e) {
    return result(e, '留言失败，请稍后再试');
  }
}