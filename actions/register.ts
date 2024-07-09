'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'

import { RegisterSchema } from '@/schemas'
import { db } from '@/db'
import { users } from '@/db/schema/users'

import { ilike, sql } from 'drizzle-orm'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationTokenEmail } from '@/lib/mail'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid Fields!'
    }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await db.select().from(users).where(ilike(users.email, email))

  console.log(existingUser)

  if (existingUser.length !== 0) {
    return { error: 'Email is already in use' }
  }

  await db.insert(users).values({
    id: await sql`gen_random_uuid()`,
    email,
    password: hashedPassword,
    name
  })

  const verificationToken = await generateVerificationToken(email)

  if (verificationToken.email && verificationToken.token) {
    await sendVerificationTokenEmail(
      verificationToken.email,
      verificationToken.token
    )
  }

  return { success: 'Confirmation Email Sent!' }
}
