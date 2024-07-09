'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import { LayoutDashboardIcon, LogOutIcon, SettingsIcon, User2Icon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { formattedName } from '@/lib/utils'
import { User } from 'next-auth'
import { UserRole } from '@/next-auth'
import { signOut } from 'next-auth/react'

interface UserMenuProps {
  user: User & {
    role: UserRole
    isTwoFactorEnabled: boolean
    isOAuth: boolean
  }
}

export function UserMenu ({ user }: UserMenuProps) {
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className='tracking-tight font-semibold text-sm'>
            {!user?.name ? <UserIcon className='w-4 h-4' /> : formattedName(user?.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-[360px]'
        align='end'
      >
        <DropdownMenuItem asChild>
          <Button
            asChild
            className='justify-start'
            variant='ghost'
          >
            <Link
              className='flex items-center gap-3'
              href='/dashboard'
            >
              <LayoutDashboardIcon className='w-4 h-4' />
              Dashboard
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            asChild
            className='justify-start'
            variant='ghost'
          >
            <Link
              className='flex items-center gap-3'
              href='/settings'
            >
              <User2Icon className='w-4 h-4' />
              My account
            </Link>
          </Button>
        </DropdownMenuItem>
        {(user.role === 'admin' || user.role === 'management') &&
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
                  <SettingsIcon className='w-4 h-4' />
                  Admin Settings
                </Link>
              </Button>
            </DropdownMenuItem>
          </>}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            variant='destructive'
            className='w-full justify-start gap-3'
            onClick={handleLogout}
          >
            <LogOutIcon className='w-4 h-4' />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
