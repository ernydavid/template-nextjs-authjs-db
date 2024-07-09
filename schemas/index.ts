import { addDays } from 'date-fns'
import * as z from 'zod'

export const SettingsSchema = z.object({
  image: z.optional(z.string()),
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum(['management', 'admin', 'manager', 'employee']),
  email: z.optional(z.string().email()),
  password: z.string().min(7).optional(),
  newPassword: z.string().min(7).optional()
}).refine((data) => {
  if (data.password && !data.newPassword) {
    return false
  }

  return true
}, {
  message: 'New Password is required!',
  path: ['newPassword']
}).refine((data) => {
  if (data.newPassword && !data.password) {
    return false
  }

  return true
}, {
  message: 'Password is required!',
  path: ['password']
})

export const NewPasswordSchema = z.object({
  password: z.string()
    .min(7, { message: 'length must be greater than 7 characters' })
})

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string()
    .min(7, { message: 'length must be greater than 7 characters' }),
  code: z.optional(z.string())
})

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string()
    .min(7, { message: 'Minimun length is 7 characters' }),
  name: z.string()
    .min(3, { message: 'Minimun length is 3 characters' })
})

export const EmployeeSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string()
    .min(7, { message: 'Minimun length is 7 characters' }),
  name: z.string()
    .min(3, { message: 'Minimun length is 3 characters' }),
  role: z.enum(['management', 'admin', 'manager', 'employee']).optional()
})

export const EditEmployeeSchema = z.object({
  id: z.string(),
  email: z.string().email({ message: 'Email is required' }),
  name: z.string()
    .min(3, { message: 'Minimun length is 3 characters' }),
  role: z.enum(['management', 'admin', 'manager', 'employee']).optional()
})

export const ResetSchema = z.object({
  email: z.string().email({ message: 'Email is required' })
})

export const FeedbackSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  feedback: z.string().min(20, { message: 'feedback must be greater than 20 characters' }),
  screenshot: z.string().optional()
})

export const CountriesSchema = z.object({
  id: z.optional(z.number()),
  name: z.string().min(3, { message: 'Length must be greater than 3 characters' }),
  iso2Name: z.string()
    .min(2, { message: 'Iso Name must be contain 2 characters' })
    .max(2, { message: 'Only 2 Characters' }),
  iso3Name: z.string().min(3).max(3),
  codePhone: z.string().startsWith('+').max(4).min(2)
})

export const DepartmentsSchema = z.object({
  id: z.optional(z.number()),
  name: z.string().min(3, { message: 'Department name length must be greater than 3 characters' })
})

export const PositionsSchema = z.object({
  id: z.optional(z.number()),
  name: z.string().min(3, { message: 'Position name length must be greater than 3 characters' })
})

export const EmergencyContactsSchema = z.object({
  id: z.optional(z.number()),
  idEmployee: z.string(),
  name: z.optional(z.string()),
  address: z.optional(z.string()),
  phone: z.optional(z.string())
})

export const EmployeePositionsSchema = z.object({
  id: z.optional(z.number()),
  idEmployee: z.string(),
  position: z.string(),
  department: z.string(),
  country: z.string()
})

export const PersonalEmployeeInformationSchema = z.object({
  id: z.optional(z.number()),
  idEmployee: z.string(),
  identification: z.string().min(4, { message: 'Length must be greater than 4 characters' }),
  address: z.string().min(4, { message: 'Length must be greater than 4 characters' }),
  phone: z.string().min(5, { message: 'Length must be greater than 5 characters' }),
  cellPhone: z.string().min(6, { message: 'Length must be greater than 6 characters' }).startsWith('+', { message: 'Number must be start with +' }),
  birthDate: z.date().max(new Date('2005-01-01'), { message: 'Too young!' }),
  bloodType: z.string().min(2, { message: 'Length must be greater than 2 characters' })
})

export const EmployeeContractsSchema = z.object({
  id: z.optional(z.string()),
  idEmployee: z.string(),
  hireDate: z.date().max(new Date(), { message: 'Select another diferent date' }),
  salary: z.string().refine((value) => !isNaN(Number(value)) && Number(value)),
  contractType: z.optional(z.enum(['part-time', 'fixed-term', 'casual', 'zero-hour', 'freelance'])),
  contractEndDate: z.optional(z.date().max(new Date('2099-01-01'), { message: 'Select another diferent date' }))
})

export const contractArr = ['part-time', 'fixed-term', 'casual', 'zero-hour', 'freelance']

export const timeOffStatusArr = ['Pending', 'Aproved', 'Rejected']
export const TimeOffSchema = z.object({
  id: z.optional(z.string()),
  employeeId: z.string(),
  type: z.string().min(3, { message: 'Time-off type must be greater than 3 characters' }),
  date: z.object({
    from: z.date().min(new Date(), { message: 'Select a future date' }),
    to: z.date().min(addDays(new Date(), +1))
  }).refine(
    (data) => data.from > addDays(new Date(), -1),
    { message: 'Start date must be in the future' }
  ),
  status: z.enum(['Pending', 'Aproved', 'Rejected']).default('Pending')
})
