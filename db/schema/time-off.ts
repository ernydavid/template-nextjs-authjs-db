import {
  pgTable,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core'
import { users } from './users'
import { InferSelectModel } from 'drizzle-orm'

export const timeOff = pgTable('employeeTimeOff', {
  id: uuid('id').primaryKey(),
  employeeId: text('employeeId').references(
    () => users.id, { onDelete: 'cascade' }
  ),
  type: text('type'),
  startDate: timestamp('startDate', { mode: 'date' }),
  endDate: timestamp('endDate', { mode: 'date' }),
  status: text('status', { enum: ['Pending', 'Aproved', 'Rejected'] }).notNull().default('Pending'),
  created: timestamp('created', { mode: 'date' }),
  updatedAt: timestamp('updatedAt', { mode: 'date' })
})

export type TimeOffType = InferSelectModel<typeof timeOff>
