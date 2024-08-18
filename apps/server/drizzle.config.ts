import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/db/schema.ts',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		host: 'test',
		user: 'user',
		password: 'pw',
		database: 'name',
	},
});
