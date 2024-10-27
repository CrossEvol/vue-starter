import bcrypt from 'bcrypt'
import Database from 'better-sqlite3'
import { and, eq, gte } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { sessions, tasks, users } from './schema'
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

export const getUserByEmail = async (email: string) => {
    return db.select().from(users).where(eq(users.email, email)).get()
}

export const getUserByID = async (userID: number) => {
    return db.select().from(users).where(eq(users.id, userID)).get()
}

export const createUser = async (
    email: string,
    password: string,
    name: string,
) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    return db
        .insert(users)
        .values({
            email,
            password: hashedPassword,
            name,
            createdAt: new Date(),
        })
        .returning()
        .get()
}

export const verifyPassword = async (
    password: string,
    hashedPassword: string,
) => {
    return bcrypt.compare(password, hashedPassword)
}

export const createSession = async (userId: number, token: string) => {
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now

    return sqlite.transaction(() => {
        // Delete all previous sessions for this user
        db.delete(sessions).where(eq(sessions.userId, userId)).run()

        // Create new session
        return db
            .insert(sessions)
            .values({
                userId,
                token,
                expiresAt,
                createdAt: new Date(),
            })
            .returning()
            .get()
    })()
}

export const getValidSession = async (userID: number) => {
    return db
        .select()
        .from(sessions)
        .where(
            and(
                eq(sessions.userId, userID),
                gte(sessions.expiresAt, new Date()), // Check if not expired
            ),
        )
        .get()
}

export const deleteUserSessions = async (userId: number) => {
    return db
        .delete(sessions)
        .where(eq(sessions.userId, userId))
        .returning()
        .run()
}
