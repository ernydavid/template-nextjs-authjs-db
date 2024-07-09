import { FrownIcon } from 'lucide-react'
import Link from 'next/link'

function ErrorPage () {
  return (
    <div className='h-full flex flex-col gap-3 justify-center items-center'>
      <FrownIcon className='w-6 h-6' />
      <h1>Opps...! Something went wrong</h1>
      <Link
        className='text-primary font-bold'
        href='/auth/login'
      >
        Back to Login
      </Link>
    </div>
  )
}

export default ErrorPage
