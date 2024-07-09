import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

// connection to database
export const db = drizzle(sql)
