import * as z from 'zod'

export const SettingsSchema = z.object({
  image: z.optional(z.string()),
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum(['admin', 'manager', 'user']),
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

export const ResetSchema = z.object({
  email: z.string().email({ message: 'Email is required' })
})
