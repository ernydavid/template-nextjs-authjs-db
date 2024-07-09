'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'

import { EditEmployeeSchema, EmployeePositionsSchema, EmployeeSchema, PersonalEmployeeInformationSchema } from '@/schemas'
import { db } from '@/db'
import { UserType, users } from '@/db/schema/users'

import { eq, ilike, sql } from 'drizzle-orm'
import { sendInvitationEmail } from '@/lib/mail'
import { currentRole, currentUser } from '@/lib/auth'
import { UserRole } from '@/next-auth'
import { getUserById } from '@/data/user'
import { revalidatePath } from 'next/cache'
import { employeePositionTable, personalEmployeeInformation } from '@/db/schema/employee'
import { getCountryByName } from './countries'

export const addNewEmployee = async (values: z.infer<typeof EmployeeSchema>) => {
  const user = await currentUser()
  const validatedFields = EmployeeSchema.safeParse(values)

  console.log(validatedFields)

  if (!validatedFields.success) {
    return {
      error: 'Invalid Fields!'
    }
  }

  const { email, password, name, role } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await db.select().from(users).where(ilike(users.email, email))

  if (existingUser.length !== 0) {
    return { error: 'Email is already in use' }
  }

  await db.insert(users).values({
    id: await sql`gen_random_uuid()`,
    email,
    password: hashedPassword,
    name,
    role
  })

  await sendInvitationEmail({
    name,
    invitedByUsername: user?.name as string,
    invitedByEmail: user?.email as string,
    credentialEmail: email,
    credentialPassword: password,
    inviteLink: process.env.NEXT_PUBLIC_APP_URL + '/auth/login'
  })

  revalidatePath('/dashboard/employees')
  return { success: 'Employee created and Invitation sent!' }
}

export const sendCredentialsByEmail = async ({
  name,
  invitedByUsername,
  credentialEmail,
  credentialPassword,
  invitedByEmail,
  inviteLink
}: {
    name: string
    invitedByUsername: string
    credentialEmail: string
    credentialPassword: string
    invitedByEmail: string
    inviteLink: string
  }) => {
  await sendInvitationEmail({
    name,
    invitedByUsername,
    credentialEmail,
    credentialPassword,
    invitedByEmail,
    inviteLink
  })

  return { success: 'Credentials sent!' }
}

export const editBasicInfoEmployee = async (
  values: z.infer<typeof EditEmployeeSchema>
) => {
  const rolePermission = await currentRole()

  if (rolePermission !== 'admin' && rolePermission !== 'management') {
    return { error: 'Not Authorized!' }
  }

  const validatedFields = EditEmployeeSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields!' }
  }

  const { id, name, email, role } = validatedFields.data

  await db.update(users).set({
    name,
    email,
    role
  }).where(eq(users.id, id))

  revalidatePath('/dashboard')
  return { success: 'Employee Updated!' }
}

export const editRole = async (
  userId: string,
  newRole: UserRole
) => {
  const role = await currentRole()

  if (role === 'admin' || role === 'management') {
    const user = await getUserById(userId)

    if (!user) {
      return { error: 'Employee not found!' }
    }

    await db.update(users).set({
      role: newRole
    }).where(eq(users.id, user.id))

    revalidatePath('/dashboard')
    return { success: 'Role has updated!' }
  }
}

export const deleteEmployeeById = async (id: string, phrase: string) => {
  if (phrase !== 'Delete Employee') {
    return { error: 'Phrase is invalid!' }
  }

  await db.delete(users).where(
    eq(users.id, id)
  )

  revalidatePath('/dashboard/employees')
  return { success: 'Employee deleted from database!' }
}

export const getEmployeesWithoutPosition = async () => {
  const role = await currentRole()
  const filteredEmployees: UserType[] = []

  if (role !== 'admin' && role !== 'management') {
    return { error: 'Not authorized!' }
  }

  const noPositionEmployees = await db.select().from(users).leftJoin(
    employeePositionTable, eq(users.id, employeePositionTable.idEmployee)
  )

  if (noPositionEmployees.length !== 0) {
    noPositionEmployees.forEach(({ employeesPositions, user }) => {
      if (!employeesPositions) {
        filteredEmployees.push(user)
      }
    })

    revalidatePath('admin-settings')
    return filteredEmployees
  }
}

export const getEmployeePositionById = async (id: number) => {
  const employeePosition = await db.select().from(employeePositionTable).where(
    eq(employeePositionTable.id, id)
  )

  return employeePosition[0]
}

export const assignEmployeePosition = async (values: z.infer<typeof EmployeePositionsSchema>) => {
  const validatedFields = EmployeePositionsSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields!' }
  }

  const { idEmployee, position, department, country } = validatedFields.data

  const role = await currentRole()
  const iso2Name = await getCountryByName(country)

  if (!iso2Name) {
    return { error: 'Country not found!' }
  }

  const existingPosition = await db.select().from(employeePositionTable).where(eq(employeePositionTable.idEmployee, values.idEmployee))

  if (existingPosition.length === 3) {
    return { error: 'You can assign only 3 positions by employee!' }
  }

  if (role !== 'admin' && role !== 'management') {
    return { error: 'Not authorized!' }
  }

  const existingUser = await getUserById(idEmployee)

  if (!existingUser) {
    return { error: 'Employee not found!' }
  }

  await db.insert(employeePositionTable).values({
    idEmployee,
    department,
    position,
    country,
    iso2Name: iso2Name.iso2Name
  })

  revalidatePath('/admin-settings')
  revalidatePath(`/dashboard/employee/${idEmployee}/edit`)
  return { success: 'Employee Position Created!' }
}

export const updateEmployeePosition = async (values: z.infer<typeof EmployeePositionsSchema>) => {
  const validatedFields = EmployeePositionsSchema.safeParse(values)
  const role = await currentRole()

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { idEmployee, id, position, department, country } = validatedFields.data
  const existingCountry = await getCountryByName(country)

  if (!existingCountry) {
    return { error: 'Country not found!' }
  }
  const { iso2Name } = existingCountry

  if (role !== 'admin' && role !== 'management') {
    return { error: 'Not Authorized!' }
  }

  const existingEmployee = await getUserById(idEmployee)

  if (!existingEmployee) {
    return { error: 'Employee not found!' }
  }

  await db.update(employeePositionTable).set({
    department,
    position,
    country,
    iso2Name
  }).where(
    eq(employeePositionTable.id, Number(id))
  )

  revalidatePath(`/dashboard/employees/${idEmployee}/edit`)
  revalidatePath(`/dashboard/employees/${idEmployee}`)
  revalidatePath('/admin-settings')
  return { success: 'Employee Position updated!' }
}

export const deleteEmployeePositionById = async (id: number, employeeId: string) => {
  const employeePosition = await getEmployeePositionById(id)

  if (!employeePosition) {
    return { error: 'Employee Position is not exist!' }
  }

  await db.delete(employeePositionTable).where(
    eq(employeePositionTable.id, id)
  )

  revalidatePath('/dashboard')
  revalidatePath(`/dashboard/employees/${employeeId}/edit`)
  return { success: 'Employee Position deleted!' }
}

export const getEmployeeJobInfoById = async (idEmployee: string) => {
  const employeeInfo = await db.select().from(employeePositionTable).where(eq(employeePositionTable.idEmployee, idEmployee))

  revalidatePath('/admin-settings')
  return employeeInfo
}

export const getEmployeePersonalInfo = async (employeeId: string) => {
  const employeePersonalData = await db.select().from(personalEmployeeInformation).where(
    eq(personalEmployeeInformation.idEmployee, employeeId)
  )

  return employeePersonalData[0]
}

export const insertEmployeePersonalInfo = async (values: z.infer<typeof PersonalEmployeeInformationSchema>) => {
  const user = await currentUser()
  const validatedFields = PersonalEmployeeInformationSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields!' }
  }

  const { idEmployee, identification, address, phone, cellPhone, birthDate, bloodType } = validatedFields.data

  const formattedIdentification = identification.toUpperCase()
  const formattedBirthDate = new Date(birthDate)

  if (user?.id !== idEmployee) {
    return { error: 'Users not match!' }
  }

  const existingInfo = await db.select().from(personalEmployeeInformation).where(

    eq(personalEmployeeInformation.idEmployee, idEmployee)
  )

  if (existingInfo.length !== 0) {
    return { error: 'Personal information is already exist!' }
  }

  await db.insert(personalEmployeeInformation).values({
    idEmployee,
    identification: formattedIdentification,
    address,
    phone,
    cellPhone,
    birthDate: formattedBirthDate,
    bloodType
  })

  revalidatePath('/settings')
  return { success: 'Personal Information Added!' }
}

export const updateEmployeePersonalInfo = async (values: z.infer<typeof PersonalEmployeeInformationSchema>) => {
  const user = await currentUser()
  const validatedFields = PersonalEmployeeInformationSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields!' }
  }

  const { idEmployee, identification, address, phone, cellPhone, birthDate, bloodType, id } = validatedFields.data

  const formattedIdentification = identification.toUpperCase()
  const formattedBirthDate = new Date(birthDate)

  if (user?.id !== idEmployee) {
    return { error: 'Users not match!' }
  }

  await db.update(personalEmployeeInformation).set({
    idEmployee,
    identification: formattedIdentification,
    address,
    phone,
    cellPhone,
    birthDate: formattedBirthDate,
    bloodType
  }).where(
    eq(personalEmployeeInformation.id, Number(id))
  )

  revalidatePath('/settings')
  return { success: 'Personal Information Updated!' }
}

export const getEmployeeBasicInfoByIdEmployee = async (employeeId: string) => {
  const employeeInfo = await getUserById(employeeId)
  const basicInfo = await getEmployeePersonalInfo(employeeId)
  const positionInfo = await getEmployeeJobInfoById(employeeId)

  if (employeeInfo && basicInfo && positionInfo) {
    const { id, name, email, image, isTwoFactorEnabled, role } = employeeInfo
    const { cellPhone, phone } = basicInfo

    revalidatePath(`/dashboard/employees/${employeeId}`)
    return { id, name, email, image, isTwoFactorEnabled, role, cellPhone, phone, positionInfo }
  }
}
