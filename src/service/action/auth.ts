'use server';

import { signIn, signOut } from '@/lib/auth';
import redis from '@/lib/redis';
import { result } from '@/lib/utils';
import { BizError, ErrorCode } from '@/service/error';
import { revalidatePath } from 'next/cache';

export async function loginWithGithub() {
  await signIn('github');
}

export async function loginWithGoogle() {
  await signIn('google');
}

export async function loginWithEmail(email: string) {
  try {
    const redisKey = `login-email:${email}`;
    const hasKey = await redis.get(redisKey);
    if (hasKey)
      throw new BizError(ErrorCode.TooFrequent, '邮件已经发送，请五分钟后再试');
    await signIn('http-email', { email, redirect: false });
    await redis.setEx(redisKey, 60 * 5, '1');
    return result();
  } catch (e: any) {
    return result(e, '邮件发送失败，请稍后再试');
  }
}

export async function logout() {
  await signOut({ redirect: false });
  revalidatePath('/');
}
