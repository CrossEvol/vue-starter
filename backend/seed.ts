import Database from 'better-sqlite3'
import { count } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { users, tasks } from './src/schema'

const sqlite = new Database('sqlite.db')
const db = drizzle(sqlite, { logger: true })

const initializeUsers = async () => {
    const usersCount = (await db.select({ count: count() }).from(users))[0]
        .count

    if (usersCount === 0) {
        Array.from({ length: 3 }).forEach((_, index) => {
            db.insert(users)
                .values({
                    email: `user${index + 1}@example.com`,
                    password: 'password123', // In production, this should be hashed
                    name: `User ${index + 1}`,
                    createdAt: new Date(),
                })
                .run()
        })
        return true
    }
    return false
}

const initializeTasks = async () => {
    const tasksCount = (await db.select({ count: count() }).from(tasks))[0]
        .count

    if (tasksCount === 0) {
        Array.from({ length: 5 }).forEach((_, index) => {
            db.insert(tasks)
                .values({
                    text: `Sample Task ${index + 1}`,
                    done: false,
                    createdAt: new Date(),
                })
                .run()
        })
        return true
    }
    return false
}

const main = async () => {
    await initializeUsers()
    await initializeTasks()
}

await main()
