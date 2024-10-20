import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
  id: text().primaryKey(),
  githubId: integer().unique(),
  username: text(),
});

export const sessionTable = sqliteTable('session', {
  id: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer().notNull(),
});
