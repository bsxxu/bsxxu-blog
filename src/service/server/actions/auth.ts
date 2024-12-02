'use server';

import { signIn, signOut } from '@/lib/auth';
import redis from '@/lib/redis';
import { revalidatePath } from 'next/cache';

export async function loginWithGithub() {
  await signIn('github');
}

export async function loginWithGoogle() {
  await signIn('google');
}

//TODO 抛出特定错误
export async function loginWithEmail(email: string) {
  const redisKey = `login-email:${email}`;
  const hasKey = await redis.get(redisKey);
  if (hasKey)
    throw new Error('Email has been sent, please try again 5 minutes later.');
  await signIn('http-email', { email, redirect: false });
  await redis.setEx(redisKey, 60 * 5, '1');
}

export async function logout() {
  await signOut({ redirect: false });
  revalidatePath('/');
}
