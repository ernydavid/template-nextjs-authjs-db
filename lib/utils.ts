import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateWorkedTimeFormatted (hireDate: Date) {
  // Get the current date
  const currentDate = new Date()

  // Calculate the difference in months
  let diffMonths = (currentDate.getFullYear() - hireDate.getFullYear()) * 12
  diffMonths -= hireDate.getMonth()
  diffMonths += currentDate.getMonth()

  const years = Math.floor(diffMonths / 12)
  const months = diffMonths % 12

  // Construct the formatted string
  let formattedWorkedTime = ''
  if (years > 0) {
    formattedWorkedTime += years + ' year' + (years > 1 ? 's' : '') + ', '
  }
  if (months > 0 || years === 0) {
    formattedWorkedTime += months + ' month' + (months > 1 ? 's' : '')
  }

  return formattedWorkedTime
}

export function formattedName (name: string | null | undefined) {
  const formattedName =
  !name
    ? ''
    : name?.includes(' ')
      ? name?.split(' ').map((word) => (word.charAt(0))).join('').toUpperCase()
      : name.slice(0, 2).toUpperCase()

  return formattedName
}

export function shortestId (id: string | undefined | null) {
  const shortedId = !id ? null : '...' + id?.slice(29)
  return shortedId
}
