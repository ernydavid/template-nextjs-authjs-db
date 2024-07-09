'use server'

import { emergencyContacts } from '@/db/schema/employee'
import { db } from '@/db'
import { z } from 'zod'
import { EmergencyContactsSchema } from '@/schemas'
import { eq, ilike } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { getUserById } from '@/data/user'

export const getEmergencyContactsByIdEmployee = async (idEmployee: string) => {
  const employeeEmergencyContacts = await db.select().from(emergencyContacts).where(
    eq(emergencyContacts.idEmployee, idEmployee)
  )

  return employeeEmergencyContacts
}

export const insertNewEmergencyContacts = async (values: z.infer<typeof EmergencyContactsSchema>) => {
  const validatedFields = EmergencyContactsSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const { idEmployee, name, address, phone } = validatedFields.data

  const existingUser = await getUserById(idEmployee)

  if (!existingUser) {
    return { error: 'Employee not exist!' }
  }

  const existingEmergencyContacts = await db.select().from(emergencyContacts)
    .where(ilike(emergencyContacts.idEmployee, idEmployee))

  if (existingEmergencyContacts.length === 2) {
    return { error: `Emergency Contacts for ${existingUser.name} is already exist!` }
  }

  await db.insert(emergencyContacts).values({
    idEmployee,
    name,
    phone,
    address,
    created: new Date(),
    updatedAt: new Date()
  })
  revalidatePath('/admin-settings')
  return { success: 'Emergency contact added!' }
}

export const deleteEmergencyContactsById = async (id: number) => {
  await db.delete(emergencyContacts).where(
    eq(emergencyContacts.id, id)
  )
  revalidatePath('/admin-settings')
  revalidatePath('/dashboard')
  return { success: 'Emergency contact deleted!' }
}

export const updateEmergencyContactsById = async (values: z.infer<typeof EmergencyContactsSchema>) => {
  const validatedFields = EmergencyContactsSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields!' }
  }

  const { id, idEmployee, name, address, phone } = validatedFields.data

  await db.update(emergencyContacts).set({
    name,
    idEmployee,
    address,
    phone,
    updatedAt: new Date()
  }).where(
    eq(emergencyContacts.id, Number(id)))

  revalidatePath('/admin-settings')
  revalidatePath('/dashboard')
  return { success: 'Emergency contact updated!' }
}
