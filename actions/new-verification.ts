'use server'

import { db } from '@/db'
import { getVerificationTokenByToken } from '@/data/verification-token'
import { getUserByEmail } from '@/data/user'
import { users, verificationToken } from '@/db/schema/users'
import { eq } from 'drizzle-orm'

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: 'Token does not exist!' }
  }

  const hasExpired = new Date(existingToken.expires as Date) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  await db.update(users).set({
    emailVerified: new Date(),
    email: existingToken.email
  }).where(eq(users.id, existingUser.id))

  await db.delete(verificationToken).where(eq(
    verificationToken.id, existingToken.id
  ))

  return { success: 'Email verified!' }
}
