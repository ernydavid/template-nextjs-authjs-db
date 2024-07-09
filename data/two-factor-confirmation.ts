import { db } from '@/db'
import { twoFactorConfirmation } from '@/db/schema/users'
import { eq } from 'drizzle-orm'

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactConfirmation = await db.select().from(twoFactorConfirmation).where(eq(
      twoFactorConfirmation.userId, userId
    ))

    return twoFactConfirmation[0]
  } catch {
    return null
  }
}
