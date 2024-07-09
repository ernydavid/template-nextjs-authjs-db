'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'

import { SettingsSchema } from '@/schemas'
import { db } from '@/db'
import { getUserByEmail, getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { users } from '@/db/schema/users'
import { eq } from 'drizzle-orm'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationTokenEmail } from '@/lib/mail'
import { revalidatePath } from 'next/cache'

export const updateSettings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser()

  if (!user) {
    return { error: 'Unauthorized!' }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: 'Unathorized!' }
  }

  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use!' }
    }

    const verificationToken = await generateVerificationToken(
      values.email
    )
    await sendVerificationTokenEmail(
      verificationToken.email,
      verificationToken.token as string
    )

    return { success: 'Email verification sent!' }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    )

    if (!passwordMatch) {
      return { error: 'Incorrect Password' }
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10)
    values.password = hashedPassword
    values.newPassword = undefined
  }

  await db.update(users).set({
    ...values
  }).where(eq(users.id, dbUser.id))

  revalidatePath('/settings')
  return { success: 'Settings updated!' }
}
