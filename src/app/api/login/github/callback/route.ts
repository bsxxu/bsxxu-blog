import { lucia } from '@/lib/auth';
import { github } from '@/lib/auth/oauth';
import { db } from '@/lib/db';
import { userTable } from '@/lib/db/schema';
import { OAuth2RequestError } from 'arctic';
import { eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';
import { cookies } from 'next/headers';
import { ofetch } from 'ofetch';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieStore = await cookies();
  const storedState = cookieStore.get('github_oauth_state')?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUser = await ofetch<{
      id: number;
      login: string;
    }>('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    let u = await db.query.userTable.findFirst({
      where: eq(userTable.githubId, githubUser.id),
    });

    if (!u) {
      u = {
        id: generateIdFromEntropySize(10),
        githubId: githubUser.id,
        username: githubUser.login,
      };
      await db.insert(userTable).values(u);
    }

    const session = await lucia.createSession(u.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
