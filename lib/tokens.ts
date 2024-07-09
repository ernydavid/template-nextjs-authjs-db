import { db } from '@/db'
import crypto from 'crypto'

import { passwordResetToken, twoFactorToken, verificationToken } from '@/db/schema/users'
import { eq, sql } from 'drizzle-orm'
import { getVerificationTokenByEmail } from '@/data/verification-token'
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token'
import { v4 as uuidv4 } from 'uuid'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString()
  // expires token by 5mins
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000)

  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) {
    await db.delete(twoFactorToken).where(eq(
      twoFactorToken.id, existingToken.id
    ))
  }

  const twoFactToken = await db.insert(twoFactorToken).values({
    id: await sql`gen_random_uuid()`,
    email,
    token,
    expires
  }).returning()

  return twoFactToken[0]
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await db.delete(passwordResetToken).where(eq(
      passwordResetToken.id,
      existingToken.id
    ))
  }

  const passwordToken = await db.insert(passwordResetToken).values({
    id: await sql`gen_random_uuid()`,
    email,
    token,
    expires
  }).returning()

  return passwordToken[0]
}

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await db.delete(verificationToken).where(eq(verificationToken.id, existingToken.id))
  }

  const verifiedToken = await db.insert(verificationToken).values({
    id: await sql`gen_random_uuid()`,
    email,
    expires,
    token
  }).returning()

  return verifiedToken[0]
}
