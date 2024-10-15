import Database from 'better-sqlite3'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { projects, users, tasks } from './schema'
import { UserWithProjects, Task } from './zod.type'

const sqlite = new Database('./sqlite.db')
const db = drizzle(sqlite, { logger: true })

export const getUsersWithProject = async () => {
    const rows = db
        .select()
        .from(users)
        .leftJoin(projects, eq(users.id, projects.ownerId))
        .groupBy(projects.id)
        .all()

    const result = rows.reduce<Record<number, UserWithProjects>>((acc, row) => {
        const user = row.user
        const project = row.project
        if (!acc[user.id]) {
            acc[user.id] = { ...user, projects: [] }
        }
        if (project?.ownerId === user.id) {
            acc[user.id].projects.push(project)
        }
        return acc
    }, {})

    return Object.values(result)
}

export const createTask = async (
    task: Omit<Task, 'id' | 'createdAt' | 'done'>,
) => {
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
    return db.update(tasks).set(task).where(eq(tasks.id, id)).returning().get()
}

export const deleteTask = async (id: number) => {
    return db.delete(tasks).where(eq(tasks.id, id)).returning().get()
}
