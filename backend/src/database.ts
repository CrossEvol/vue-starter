import Database from 'better-sqlite3'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { users, tasks } from './schema'
import { Task } from './zod.type'

const sqlite = new Database('./sqlite.db')
const db = drizzle(sqlite, { logger: true })

export const getUsers = async () => {
    return db.select().from(users).all()
}

export const createTask = async (task: Pick<Task, 'text'>) => {
    return db
        .insert(tasks)
        .values({ text: task.text, done: false, createdAt: new Date() })
        .returning()
        .get()
}

export const getAllTasks = async () => {
    return db.select().from(tasks).all()
}

export const getTaskById = async (id: number) => {
    return db.select().from(tasks).where(eq(tasks.id, id)).get()
}

export const updateTask = async (
    id: number,
    task: Partial<Omit<Task, 'id' | 'createdAt'>>,
) => {
    const { text, done } = task
    return db
        .update(tasks)
        .set({ text, done })
        .where(eq(tasks.id, id))
        .returning()
        .get()
}

export const deleteTask = async (id: number) => {
    return db.delete(tasks).where(eq(tasks.id, id)).returning().get()
}
