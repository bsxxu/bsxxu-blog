import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/lib/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: '/var/bsxxu/db/bsxxu.db',
  },
  casing: 'snake_case',
});
