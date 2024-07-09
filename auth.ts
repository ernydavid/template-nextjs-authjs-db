import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/db'
import { getUserById } from './data/user'
import { UserRole } from '@/next-auth'
import { twoFactorConfirmation, users } from './db/schema/users'
import { eq } from 'drizzle-orm'
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation'
import { getAccountByUserId } from './data/account'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  events: {
    async linkAccount ({ user }) {
      await db.update(users).set({ emailVerified: new Date() }).where(eq(users.id, user.id))
    }
  },
  callbacks: {
    async signIn ({ user, account }) {
      if (account?.provider !== 'credentials') return true

      const existingUser = await getUserById(user.id)

      if (!existingUser?.emailVerified) return false

      if (existingUser.isTwoFactorEnabled) {
        const twoFactConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

        if (!twoFactConfirmation) return false

        // delete two factor confirmation  for next sign in
        await db.delete(twoFactorConfirmation).where(eq(
          twoFactorConfirmation.id,
          twoFactConfirmation.id
        ))
      }

      return true
    },
    async session ({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email
        session.user.isOAuth = token.isOAuth as boolean
      }

      return session
    },

    async jwt ({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(
        existingUser.id
      )

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    }
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})
