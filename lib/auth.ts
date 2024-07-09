import { auth } from '@/auth'

export const roles = ['management', 'admin', 'manager', 'employee']

export const currentUser = async () => {
  const session = await auth()

  return session?.user
}

export const currentRole = async () => {
  const session = await auth()

  return session?.user.role
}
