import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const User = pgTable('user', {
	id: text('id').primaryKey(),
	username: varchar('username').unique(),
	passwordHash: text('password_hash'),
});

export const Session = pgTable('session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	userId: text('user_id')
		.references(() => User.id)
		.notNull(),
});
