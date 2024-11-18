'use server';

import { signIn, signOut } from '@/lib/auth';

export async function loginWithGithub() {
  await signIn('github');
}

export async function loginWithEmail(email: string) {
  await signIn('http-email', { email, redirect: false });
}

export async function logout() {
  await signOut({ redirect: false });
}
