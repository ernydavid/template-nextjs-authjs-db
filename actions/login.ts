'use server'

import * as z from 'zod'
import { LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/data/user'
import {
  generateVerificationToken,
  generateTwoFactorToken
} from '@/lib/tokens'
import {
  sendVerificationTokenEmail,
  sendTwoFactorTokenEmail
} from '@/lib/mail'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import { db } from '@/db'
import { twoFactorConfirmation, twoFactorToken } from '@/db/schema/users'
import { eq, sql } from 'drizzle-orm'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid Fields!'
    }
  }

  const { email, password, code } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)

    await sendVerificationTokenEmail(
      verificationToken.email,
      verificationToken.token as string
    )

    return { success: 'Confirmation email sent!' }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactToken = await getTwoFactorTokenByEmail(existingUser.email)

      if (!twoFactToken) {
        return { error: 'Invalid code!' }
      }

      if (twoFactToken.token !== code) {
        return { error: 'Invalid code!' }
      }

      const hasExpired = new Date(twoFactToken.expires as Date) < new Date()

      if (hasExpired) {
        return { error: '2FA Code has expired!' }
      }

      await db.delete(twoFactorToken).where(eq(
        twoFactorToken.id, twoFactToken.id
      ))

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      )

      if (existingConfirmation) {
        await db.delete(twoFactorConfirmation).where(eq(
          twoFactorConfirmation.id, existingConfirmation.id
        ))
      }

      await db.insert(twoFactorConfirmation).values({
        id: await sql`gen_random_uuid()`,
        userId: existingUser.id
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)

      await sendTwoFactorTokenEmail(
        twoFactorToken.email,
      twoFactorToken.token as string
      )

      return { twoFactor: true }
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    throw error
  }
}
