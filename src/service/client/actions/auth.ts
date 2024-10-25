'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { lucia, validateRequest } from '../../../lib/auth';

export async function logout() {
  const cookieStore = await cookies();
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  revalidatePath('/');
}
