import { db } from '@/db'
import { users } from '@/db/schema/users'
import { eq } from 'drizzle-orm'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.email, email))

    return user[0]
  } catch (error) {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, id))

    return user[0]
  } catch (error) {
    return null
  }
}
