import { FrownIcon } from 'lucide-react'
import Link from 'next/link'

export default function Page () {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='flex flex-col gap-2 items-center'>
        <FrownIcon className='w-9 h-9' />
        <p>Oopss... Something went wrong</p>
        <Link
          href='/'
        >Go Home
        </Link>
      </div>

    </div>
  )
}
