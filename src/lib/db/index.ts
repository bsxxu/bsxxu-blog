import { drizzle } from 'drizzle-orm/better-sqlite3';
import env from '../env';
import * as schema from './schema';

export const db = drizzle({
  connection: { source: env.DB_FILE_PATH },
  casing: 'snake_case',
  schema,
});
