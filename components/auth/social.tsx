'use client'

import { Button } from '@/components/ui/button'

import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useSearchParams } from 'next/navigation'

import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

function Social () {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const handleClick = (provider: 'github' | 'google') => {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT })
  }

  return (
    <div className='w-full flex items-center gap-x-2'>
      <Button
        variant='outline'
        size='lg'
        className='w-full'
        onClick={() => handleClick('google')}
      >
        <FcGoogle className='w-5 h-5' />
      </Button>
      <Button
        variant='outline'
        size='lg'
        className='w-full'
        onClick={() => handleClick('github')}
      >
        <FaGithub className='w-5 h-5' />
      </Button>
    </div>
  )
}

export default Social
