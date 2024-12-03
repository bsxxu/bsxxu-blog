import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/lib/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: '/var/aiduorin/db/aiduorin.db',
  },
});
