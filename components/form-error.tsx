import { BsExclamationTriangle } from 'react-icons/bs'

interface FormErrorProps {
  message?: string
}

export function FormError ({ message }: FormErrorProps) {
  if (!message) return null

  return (
    <div className='w-full flex items-center gap-2 bg-destructive px-3 py-3 rounded-lg transition'>
      <BsExclamationTriangle className='w-5 h-5 text-destructive-foreground' />
      <p className='text-sm text-destructive-foreground'>{message}</p>
    </div>
  )
}
