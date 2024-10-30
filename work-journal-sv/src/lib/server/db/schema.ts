import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	email: text('email').notNull().unique(),
	password: text('password').notNull()
});

export const entry = sqliteTable('entry', {
	id: integer('id').primaryKey({ autoIncrement: true }).unique(),
	date: text('date').notNull(),
	type: text('type').notNull(),
	text: text('text').notNull()
});
