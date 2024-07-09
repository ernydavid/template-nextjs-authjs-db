import { db } from '@/db'
import { passwordResetToken } from '@/db/schema/users'
import { eq } from 'drizzle-orm'

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordToken = await db.select().from(passwordResetToken).where(eq(passwordResetToken.token, token))

    return passwordToken[0]
  } catch {
    return null
  }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordToken = await db.select().from(passwordResetToken).where(eq(passwordResetToken.email, email))

    return passwordToken[0]
  } catch {
    return null
  }
}
