import { db } from '@/db'
import { verificationToken } from '@/db/schema/users'
import { eq } from 'drizzle-orm'

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verifiedToken = await db.select().from(verificationToken).where(eq(verificationToken.email, email))

    return verifiedToken[0]
  } catch {
    return null
  }
}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verifiedToken = await db.select().from(verificationToken).where(eq(verificationToken.token, token))

    return verifiedToken[0]
  } catch {
    return null
  }
}
