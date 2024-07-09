import {
  timestamp,
  pgTable,
  pgEnum,
  text,
  primaryKey,
  integer,
  unique,
  boolean
} from 'drizzle-orm/pg-core'
import type { AdapterAccount } from '@auth/core/adapters'
import { InferSelectModel, relations } from 'drizzle-orm'

export const roleEnum = pgEnum('role', ['management', 'admin', 'manager', 'employee'])

export const users = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  role: roleEnum('role').default('employee'),
  password: text('password'),
  isTwoFactorEnabled: boolean('isTwoFactorEnabled').default(false)
})

export const usersRelations = relations(users, ({ one }) => ({
  twoFactorConfirmation: one(twoFactorConfirmation, {
    fields: [users.id],
    references: [twoFactorConfirmation.userId]
  })
}))

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state')
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] })
  })
)

export const verificationToken = pgTable('verificationToken', {
  id: text('id').notNull().primaryKey(),
  email: text('email').notNull(),
  token: text('token').unique(),
  expires: timestamp('expires', { mode: 'date' })
}, (t) => ({
  unq: unique().on(t.email, t.token)
}))

export const passwordResetToken = pgTable('passwordResetToken', {
  id: text('id').notNull().primaryKey(),
  email: text('email').notNull(),
  token: text('token').unique(),
  expires: timestamp('expires', { mode: 'date' })
}, (t) => ({
  unq: unique().on(t.email, t.token)
}))

export const twoFactorToken = pgTable('twoFactorToken', {
  id: text('id').notNull().primaryKey(),
  email: text('email').notNull(),
  token: text('token').unique(),
  expires: timestamp('expires', { mode: 'date' })
}, (t) => ({
  unq: unique().on(t.email, t.token)
}))

export const twoFactorConfirmation = pgTable('twoFactorConfirmation', {
  id: text('id').notNull().primaryKey(),
  userId: text('userId').references(() => users.id, { onDelete: 'cascade' })
})

export type UserType = InferSelectModel<typeof users>
