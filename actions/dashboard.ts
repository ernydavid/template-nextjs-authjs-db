import { db } from '@/db'
import { countries } from '@/db/schema/countries'
import { users } from '@/db/schema/users'
import { currentUser } from '@/lib/auth'
import { getEmployeeJobInfoById, getEmployeePersonalInfo } from './employee'
import { revalidatePath } from 'next/cache'
import { getEmployeeContractById } from './contracts'
import { ilike } from 'drizzle-orm'

export const getAllCountEmployees = async () => {
  const allUsers = await db.select().from(users)
  revalidatePath('/dashboard')
  return allUsers.length
}

export const getAllEmployees = async (query: string) => {
  const allEmployees = await db.select().from(users)
    .where(ilike(users.name, `%${query}%`))

  revalidatePath('/dashboard')
  return allEmployees
}

export const getAllCountCountries = async () => {
  const allCountries = await db.select().from(countries)
  revalidatePath('/dashboard')
  return allCountries.length
}

export const getEmployeeBasicInformation = async () => {
  const user = await currentUser()

  if (!user) {
    return { error: 'User Not Found!' }
  }

  const employeePosition = await getEmployeeJobInfoById(user.id)
  const employeePersonal = await getEmployeePersonalInfo(user.id)
  const employeeContract = await getEmployeeContractById(user.id)

  revalidatePath('/dashboard')
  return { employeePosition, employeePersonal, employeeContract }
}
