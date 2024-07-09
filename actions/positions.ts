'use server'

import { positions } from '@/db/schema/employee'
import { db } from '@/db'
import { z } from 'zod'
import { PositionsSchema } from '@/schemas'
import { eq, ilike } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { currentRole } from '@/lib/auth'

export const getAllPositions = async () => {
  const allPositions = await db.select().from(positions)

  return allPositions
}

export const insertNewPosition = async (values: z.infer<typeof PositionsSchema>) => {
  const role = await currentRole()

  const date = new Date()

  if (role !== 'admin' && role !== 'management') {
    return { error: 'Not Authorized!' }
  }

  const validatedFields = PositionsSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const { name } = validatedFields.data

  const existingPosition = await db.select().from(positions)
    .where(ilike(positions.name, name))

  if (existingPosition.length !== 0) {
    return { error: 'Position is already exists!' }
  }

  await db.insert(positions).values({
    name,
    created: date
  })
  revalidatePath('/admin-settings')
  return { success: 'Position Added!' }
}

export const deletePositionById = async (id: number) => {
  const role = await currentRole()

  if (role !== 'admin' && role !== 'management') {
    return { error: 'Not authorized!' }
  }

  await db.delete(positions).where(
    eq(positions.id, id)
  )
  revalidatePath('/admin-settings')
  return { success: 'Position deleted!' }
}

export const editPositionById = async (values: z.infer<typeof PositionsSchema>) => {
  const role = await currentRole()
  const date = new Date()

  if (role !== 'admin' && role !== 'management') {
    return { error: 'Not authorized!' }
  }

  const validatedFields = PositionsSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields!' }
  }

  const { id, name } = validatedFields.data

  await db.update(positions).set({
    name,
    created: date
  }).where(
    eq(positions.id, Number(id)))

  revalidatePath('/admin-settings')
  return { success: 'Position Updated!' }
}
