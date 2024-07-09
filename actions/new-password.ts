'use server'

import * as z from 'zod'
import { NewPasswordSchema } from '@/schemas'
import { getPasswordResetTokenByToken } from '@/data/password-reset-token'
import { getUserByEmail } from '@/data/user'

import bcrypt from 'bcryptjs'
import { db } from '@/db'
import { passwordResetToken, users } from '@/db/schema/users'
import { eq } from 'drizzle-orm'

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null) => {
  if (!token) {
    return { error: 'Missing token!' }
  }

  const validatedFields = NewPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Password is invalid!' }
  }

  const { password } = validatedFields.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid token!' }
  }

  const hasExpired = new Date(existingToken.expires as Date) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.update(users).set({
    password: hashedPassword
  }).where(eq(
    users.id, existingUser.id
  ))

  await db.delete(passwordResetToken).where(eq(
    passwordResetToken.id, existingToken.id
  ))

  return { success: 'Password updated!' }
}
