import { InferSelectModel } from 'drizzle-orm'
import {
  timestamp,
  pgTable,
  text,
  serial
} from 'drizzle-orm/pg-core'

export const countries = pgTable('countries', {
  id: serial('id').primaryKey(),
  name: text('country_name').unique(),
  iso2Name: text('iso_2_name'),
  iso3Name: text('iso_3_name'),
  codePhone: text('code_phone'),
  created: timestamp('created', { mode: 'date' })
})

export type CountriesType = InferSelectModel<typeof countries>
