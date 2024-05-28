import { NodePostgresAdapter } from '@lucia-auth/adapter-postgresql';
import { Lucia, TimeSpan } from 'lucia';
import { pool } from './db';

//TODO 登录相关
const adapter = new NodePostgresAdapter(pool, {
	user: 'user',
	session: 'session',
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === 'production',
		},
	},
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
	}
}
