import { auth } from '@/auth'

export const roles = ['admin', 'manager', 'user']

export const currentUser = async () => {
  const session = await auth()

  return session?.user
}

export const currentRole = async () => {
  const session = await auth()

  return session?.user.role
}
