import {
  numeric,
  pgTable,
  serial,
  text,
  timestamp
} from 'drizzle-orm/pg-core'
import { users } from './users'
import { InferSelectModel } from 'drizzle-orm'
import { countries } from './countries'

export const positions = pgTable('positions', {
  id: serial('id').primaryKey(),
  name: text('name'),
  created: timestamp('created', { mode: 'date' })
})

export type PositionType = InferSelectModel<typeof positions>

export const departments = pgTable('departments', {
  id: serial('id').primaryKey(),
  name: text('name').unique(),
  created: timestamp('created', { mode: 'date' })
})

export type DepartmentsType = InferSelectModel<typeof departments>

export const emergencyContacts = pgTable('emergency_contacts', {
  id: serial('id').primaryKey(),
  idEmployee: text('id_employee').references(
    () => users.id, { onDelete: 'cascade' }
  ),
  name: text('contact_name'),
  address: text('contact_address'),
  phone: text('contact_phone'),
  created: timestamp('created_at', { mode: 'date' }),
  updatedAt: timestamp('updated_at', { mode: 'date' })
})

export type EmergencyContactsType = InferSelectModel<typeof emergencyContacts>

export const employeePositionTable = pgTable('employeesPositions', {
  id: serial('id').primaryKey(),
  idEmployee: text('idEmployee').references(
    () => users.id, { onDelete: 'cascade' }
  ),
  department: text('employeeDepartment'),
  position: text('employeePosition'),
  country: text('employeeCountry').references(
    () => countries.name, { onDelete: 'no action' }
  ),
  iso2Name: text('iso2Name')
})

export type EmployeePositionsTableType = InferSelectModel<typeof employeePositionTable>

export type EmployeePositionTableType = InferSelectModel<typeof employeePositionTable>

export const personalEmployeeInformation = pgTable('personalEmployeeInformation', {
  id: serial('id').primaryKey(),
  idEmployee: text('idEmployee').references(
    () => users.id, { onDelete: 'cascade' }
  ),
  identification: text('idDocument'),
  address: text('address'),
  phone: text('phone'),
  cellPhone: text('cellPhone'),
  birthDate: timestamp('birthDate', { mode: 'date' }),
  bloodType: text('bloodType')
})

export type PersonalEmployeeInformationType = InferSelectModel<typeof personalEmployeeInformation>

export const employeeContractsTable = pgTable('employeeContracts', {
  id: text('id').notNull().primaryKey(),
  employeeId: text('idEmployee').references(
    () => users.id, { onDelete: 'cascade' }
  ),
  hireDate: timestamp('hireDate', { mode: 'date' }),
  salary: numeric('salary'),
  contractType: text('contractType', { enum: ['part-time', 'fixed-term', 'casual', 'zero-hour', 'freelance'] }),
  contractEndDate: timestamp('contractEndDate', { mode: 'date' }),
  created: timestamp('createdAt', { mode: 'date' }),
  updated: timestamp('updatedAt', { mode: 'date' })
})

export type employeeContractsTableType = InferSelectModel<typeof employeeContractsTable>
