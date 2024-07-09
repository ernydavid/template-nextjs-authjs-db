import { db } from '@/db'
import { twoFactorToken } from '@/db/schema/users'
import { eq } from 'drizzle-orm'

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactToken = await db.select().from(twoFactorToken).where(eq(
      twoFactorToken.token, token
    ))

    return twoFactToken[0]
  } catch {
    return null
  }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactToken = await db.select().from(twoFactorToken).where(eq(
      twoFactorToken.email, email
    ))

    return twoFactToken[0]
  } catch {
    return null
  }
}
