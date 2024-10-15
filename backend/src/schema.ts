import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('user', {
    id: integer('id').primaryKey(), // 'id' is the column name
    fullName: text('full_name'),
})

export const projects = sqliteTable('project', {
    id: integer('id').primaryKey(), // 'id' is the column name
    name: text('name'),
    ownerId: integer('owner_id')
        .notNull()
        .references(() => users.id),
})

export const tasks = sqliteTable('task', {
    id: integer('id').primaryKey(), // 'id' is the column name
    text: text('text').notNull(),
    done: integer({ mode: 'boolean' }).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp_ms' })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
})
