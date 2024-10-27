import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

const sqlite = new Database('sqlite.db')
const db = drizzle(sqlite, { logger: true })

// this will automatically run needed migrations on the database
/* 
https://orm.drizzle.team/docs/migrations
https://orm.drizzle.team/docs/kit-overview
*/
migrate(db, { migrationsFolder: './drizzle' })
