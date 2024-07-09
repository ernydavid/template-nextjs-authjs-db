'use client'

import { logout } from '@/actions/logout'
import { Button } from '../ui/button'
import { LogOutIcon } from 'lucide-react'

export function LogoutButton () {
  const handleClick = () => {
    logout()
  }

  return (
    <Button
      variant='ghost'
      className='justify-start text-destructive-foreground'
      onClick={handleClick}
    >
      <div className='w-full flex items-center gap-3'>
        <LogOutIcon className='w-5 h-5' />
        Logout
      </div>
    </Button>
  )
}
