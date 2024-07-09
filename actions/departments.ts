'use server'

import { departments } from '@/db/schema/employee'
import { db } from '@/db'
import { z } from 'zod'
import { DepartmentsSchema } from '@/schemas'
import { eq, ilike } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { currentRole } from '@/lib/auth'

export const getAllDepartments = async () => {
  const allDepartments = await db.select().from(departments)
  revalidatePath('/admin-settings')
  return allDepartments
}

export const insertNewDepartment = async (values: z.infer<typeof DepartmentsSchema>) => {
  const role = await currentRole()

  const date = new Date()

  if (role !== 'admin' && role !== 'management') {
    return { error: 'Not Authorized!' }
  }

  const validatedFields = DepartmentsSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const { name } = validatedFields.data

  const existingDepartment = await db.select().from(departments)
    .where(ilike(departments.name, name))

  if (existingDepartment.length !== 0) {
    return { error: 'Department is already exists!' }
  }

  await db.insert(departments).values({
    name,
    created: date
  })
  revalidatePath('/admin-settings')
  return { success: 'Department Added!' }
}

export const deleteDepartmentById = async (id: number) => {
  const role = await currentRole()

  if (role !== 'admin' && role !== 'management') {
    return { error: 'Not authorized!' }
  }

  await db.delete(departments).where(
    eq(departments.id, id)
  )
  revalidatePath('/admin-settings')
  return { success: 'Department deleted!' }
}

export const editDepartmentById = async (values: z.infer<typeof DepartmentsSchema>) => {
  const role = await currentRole()
  const date = new Date()

  if (role !== 'admin' && role !== 'management') {
    return { error: 'Not authorized!' }
  }

  const validatedFields = DepartmentsSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields!' }
  }

  const { id, name } = validatedFields.data

  await db.update(departments).set({
    name,
    created: date
  }).where(
    eq(departments.id, Number(id)))

  revalidatePath('/admin-settings')
  return { success: 'Department Updated!' }
}
