'use server'

import { countries } from '@/db/schema/countries'
import { db } from '@/db'
import { z } from 'zod'
import { CountriesSchema } from '@/schemas'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { currentRole } from '@/lib/auth'

export const getAllCountries = async () => {
  const allCountries = await db.select().from(countries)

  return allCountries
}

export const insertNewCountry = async (values: z.infer<typeof CountriesSchema>) => {
  const role = await currentRole()

  if (role !== 'admin' && role !== 'management') {
    return { error: 'Not Authorized!' }
  }

  const validatedFields = CountriesSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const { name, iso2Name, iso3Name, codePhone } = validatedFields.data

  const existingCountry = await db.select().from(countries)
    .where(eq(countries.iso2Name, iso2Name.toUpperCase()))

  if (existingCountry.length !== 0) {
    return { error: 'Country is already exists!' }
  }

  const formattedIso2Name = iso2Name.toUpperCase()
  const formattedIso3Name = iso3Name.toUpperCase()

  await db.insert(countries).values({
    name,
    iso2Name: formattedIso2Name,
    iso3Name: formattedIso3Name,
    codePhone,
    created: new Date()
  })
  revalidatePath('/admin-settings')
  return { success: 'Country Added!' }
}

export const deleteCountryById = async (id: number) => {
  const role = await currentRole()

  if (role !== 'admin' && role !== 'management') {
    return { error: 'Not authorized!' }
  }

  await db.delete(countries).where(
    eq(countries.id, id)
  )
  revalidatePath('/admin-settings')
  return { success: 'Country deleted!' }
}

export const editCountryById = async (values: z.infer<typeof CountriesSchema>) => {
  const role = await currentRole()

  if (role !== 'admin' && role !== 'management') {
    return { error: 'Not authorized!' }
  }

  const validatedFields = CountriesSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields!' }
  }

  const { id, name, iso2Name, iso3Name, codePhone } = validatedFields.data

  const formattedIso2Name = iso2Name.toUpperCase()
  const formattedIso3Name = iso3Name.toUpperCase()

  await db.update(countries).set({
    name,
    iso2Name: formattedIso2Name,
    iso3Name: formattedIso3Name,
    codePhone,
    created: new Date()
  }).where(
    eq(countries.id, Number(id)))

  revalidatePath('/admin-settings')
  return { success: 'Country Updated!' }
}

export const getCountryByName = async (countryName: string) => {
  const country = await db.select().from(countries).where(
    eq(countries.name, countryName)
  )

  return country[0]
}
