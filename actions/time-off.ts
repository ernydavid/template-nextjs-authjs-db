'use server'

import { db } from '@/db'
import { TimeOffSchema } from '@/schemas'
import * as z from 'zod'
import { timeOff } from '@/db/schema/time-off'
import { getUserById } from '@/data/user'
import { eq, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { sendNewTimeOffRequestEmail, sendTimeOffResponseEmail } from '@/lib/mail'
import { currentUser } from '@/lib/auth'
import { users } from '@/db/schema/users'

export const getAllTimeOffRequest = async () => {
  const allRequests = await db.select().from(timeOff).leftJoin(
    users, eq(timeOff.employeeId, users.id)
  )
  revalidatePath('/dashboard/time-off')
  return allRequests
}

export const getTimeOffRequestById = async (employeeId: string) => {
  const timeOffRequests = await db.select().from(timeOff).where(
    eq(timeOff.employeeId, employeeId)
  )

  return timeOffRequests
}

export const getAllTimeOffRequestByStatus = async (status: 'Pending' | 'Aproved' | 'Rejected') => {
  const allRequest = await db.select().from(timeOff)
    .leftJoin(users, eq(timeOff.employeeId, users.id))
    .where(
      eq(timeOff.status, status)
    )

  revalidatePath('/dashboard/time-off')
  return allRequest
}

export const newTimeOffRequest = async (values: z.infer<typeof TimeOffSchema>) => {
  const validatedFields = TimeOffSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { employeeId, date, type } = validatedFields.data

  const existingRequest = await getTimeOffRequestById(employeeId)

  if (existingRequest.length !== 0) {
    if (existingRequest[0].status === 'Rejected') {
      await db.delete(timeOff).where(
        eq(timeOff.employeeId, employeeId)
      )
    } else {
      return { error: 'You have a request in queue!' }
    }
  }

  const existingEmployee = await getUserById(employeeId)

  if (!existingEmployee) {
    return { error: 'Employee not found!' }
  }

  await db.insert(timeOff).values({
    id: await sql`gen_random_uuid()`,
    employeeId,
    type,
    status: 'Pending',
    startDate: date.from,
    endDate: date.to,
    created: new Date()
  })

  await sendNewTimeOffRequestEmail({
    employeeEmail: existingEmployee.email,
    employeeName: existingEmployee.name as string,
    startDate: date.from,
    endDate: date.to,
    created: new Date(),
    type
  })

  revalidatePath('/dashboard/time-off')
  return { success: 'Time off Request Created!' }
}

export const updateTimeOffRequest = async (values: z.infer<typeof TimeOffSchema>) => {
  const validatedFields = TimeOffSchema.safeParse(values)
  const user = await currentUser()

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { employeeId, status, date } = validatedFields.data

  const existingRequest = await getTimeOffRequestById(employeeId)

  if (existingRequest.length === 0) {
    return { error: 'Request not exist!' }
  }

  const existingEmployee = await getUserById(employeeId)

  if (!existingEmployee) {
    return { error: 'Employee not exist!' }
  }

  await db.update(timeOff).set({
    status
  }).where(
    eq(timeOff.employeeId, employeeId)
  )

  await sendTimeOffResponseEmail({
    employeeEmail: existingEmployee.email,
    employeeName: existingEmployee.name as string,
    startDate: date.from,
    endDate: date.to,
    status,
    updatedAt: new Date(),
    userResponse: user?.name as string
  })

  revalidatePath('/dashboard/time-off')
  return { success: 'Request updated!' }
}
