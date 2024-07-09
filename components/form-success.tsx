import { CheckCircle } from 'lucide-react'

interface FormSuccessProps {
  message?: string
}

export function FormSuccess ({ message }: FormSuccessProps) {
  if (!message) return null

  return (
    <div className='w-full flex items-center gap-2 bg-emerald-500 p-3 rounded-lg'>
      <CheckCircle className='w-5 h-5 text-white' />
      <p className='text-sm text-white'>{message}</p>
    </div>
  )
}
