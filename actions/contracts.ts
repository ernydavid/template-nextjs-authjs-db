'use server'

import { employeeContractsTable } from '@/db/schema/employee'
import { db } from '@/db'
import * as z from 'zod'
import { EmployeeContractsSchema } from '@/schemas'
import { eq, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { currentRole } from '@/lib/auth'
import { UserType, users } from '@/db/schema/users'
import { getUserById } from '@/data/user'

export const getAllEmployeesContracts = async () => {
  const role = await currentRole()

  if (role !== 'admin' && role !== 'management') {
    return { error: 'Not authorized!' }
  }

  const allCountracts = await db.select().from(employeeContractsTable)

  return allCountracts
}

export const getEmployeeContractById = async (employeeId: string) => {
  const contractInfo = await db.select().from(employeeContractsTable)
    .leftJoin(users, eq(employeeContractsTable.employeeId, users.id))
    .where(
      eq(employeeContractsTable.employeeId, employeeId)
    )

  return contractInfo[0]
}

export const getEmployeesWithoutContracts = async () => {
  const role = await currentRole()
  const filteredEmployees: UserType[] = []

  if (role !== 'admin' && role !== 'management') {
    return { error: 'Not authorized!' }
  }

  const noContractEmployees = await db.select().from(users).leftJoin(
    employeeContractsTable, eq(users.id, employeeContractsTable.employeeId)
  )

  if (noContractEmployees.length !== 0) {
    noContractEmployees.forEach(({ employeeContracts, user }) => {
      if (!employeeContracts) {
        filteredEmployees.push(user)
      }
    })
    revalidatePath('admin-settings')
    return filteredEmployees
  }
}

export const newEmployeeContract = async (values: z.infer<typeof EmployeeContractsSchema>) => {
  const validatedFields = EmployeeContractsSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const existingSalary = await db.select().from(employeeContractsTable)
    .where(
      eq(employeeContractsTable.employeeId, validatedFields.data.idEmployee as string))

  if (existingSalary.length !== 0) {
    return { error: 'Contract is already exist!' }
  }

  const existingEmployee = await getUserById(validatedFields.data.idEmployee as string)

  if (!existingEmployee) {
    return { error: 'Employee not found!' }
  }

  await db.insert(employeeContractsTable).values({
    id: await sql`gen_random_uuid()`,
    contractEndDate: validatedFields.data.contractEndDate,
    contractType: validatedFields.data.contractType,
    employeeId: validatedFields.data.idEmployee,
    hireDate: validatedFields.data.hireDate,
    salary: validatedFields.data.salary,
    created: new Date(),
    updated: new Date()
  })

  revalidatePath('/admin-settings')
  return { success: 'New contract created!' }
}

export const updateEmployeeContract = async (values: z.infer<typeof EmployeeContractsSchema>) => {
  const validatedFields = EmployeeContractsSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const existingSalary = await db.select().from(employeeContractsTable)
    .where(
      eq(employeeContractsTable.employeeId, validatedFields.data.idEmployee as string))

  if (existingSalary.length === 0) {
    return { error: 'Contract is not Exist!' }
  }

  const existingEmployee = await getUserById(validatedFields.data.idEmployee as string)

  if (!existingEmployee) {
    return { error: 'Employee not found!' }
  }

  await db.update(employeeContractsTable).set({
    contractEndDate: validatedFields.data.contractEndDate,
    contractType: validatedFields.data.contractType,
    hireDate: validatedFields.data.hireDate,
    salary: validatedFields.data.salary,
    updated: new Date()
  })

  revalidatePath(`/dashboard/employees/${validatedFields.data.idEmployee}/edit`)
  revalidatePath('/admin-settings')
  return { success: 'Contract updated!' }
}
