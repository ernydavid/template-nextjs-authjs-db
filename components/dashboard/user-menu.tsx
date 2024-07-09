'use client'

import { InfoBadge } from '@/components/info-badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { UserRole } from '@/next-auth'
import { ChevronDownIcon, ChevronUpIcon, Settings2Icon, UserCircle2Icon } from 'lucide-react'
import { User } from 'next-auth'
import Link from 'next/link'
import { useState } from 'react'

interface UserMenuAsideProps {
  user: (User & {
    role: UserRole
    isTwoFactorEnabled: boolean
    isOAuth: boolean
}) | undefined
}

export function UserMenu ({ user }: UserMenuAsideProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className='w-full flex flex-col items-center tracking-tight gap-2'>
      <div className='w-20 h-20 rounded-full overflow-hidden bg-slate-200 flex justify-center items-center'>
        <img
          className='w-20 h-20'
          src='/icon-light.svg'
          alt='logo'
        />
      </div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger onClick={() => setOpen(!open)}>
          <div className='w-full flex flex-col'>
            <div className='w-full flex justify-center gap-3 items-center'>
              <p className='font-semibold'>{user?.name}</p>
              {!open
                ? <ChevronDownIcon className='w-5 h-5' />
                : <ChevronUpIcon className='w-5 h-5' />}
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[200px]'>
          <DropdownMenuItem asChild>
            <Button
              asChild
              variant='ghost'
              size='sm'
              className='justify-start'
            >
              <Link
                href='/settings'
                className='flex items-center gap-3'
              >
                <UserCircle2Icon className='w-4 h-4' />
                <span>My Account</span>
              </Link>
            </Button>
          </DropdownMenuItem>
          {(user?.role === 'admin' || user?.role === 'management') &&
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Button
                  asChild
                  className='justify-start'
                  variant='ghost'
                >
                  <Link
                    className='flex items-center gap-3'
                    href='/admin-settings'
                  >
                    <Settings2Icon className='w-5 h-5' />
                    General Settings
                  </Link>
                </Button>
              </DropdownMenuItem>
            </>}
        </DropdownMenuContent>
      </DropdownMenu>
      <InfoBadge className={cn(
        'text-foreground',
        user?.role === 'admin' ? 'bg-emerald-500' : '',
        user?.role === 'management' ? 'bg-yellow-500' : ''
      )}
      >
        <p>{user?.role}</p>
      </InfoBadge>
    </div>
  )
}
