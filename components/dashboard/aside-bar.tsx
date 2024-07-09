'use client'

import { HomeIcon, MedalIcon, PartyPopperIcon, PlaneIcon, Users2Icon } from 'lucide-react'
import { UserMenu } from '@/components/dashboard/user-menu'
import { ButtonMenu } from '@/components/dashboard/button-menu'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { User } from 'next-auth'
import { UserRole } from '@/next-auth'

interface AsideBarProps {
  user: (User & {
    role: UserRole
    isTwoFactorEnabled: boolean
    isOAuth: boolean
}) | undefined
}

export function AsideBar ({ user }: AsideBarProps) {
  const pathname = usePathname()
  return (
    <div className='md:w-[250px] w-full md:h-full justify-between flex flex-col md:py-6 bg-primary text-primary-foreground rounded-2xl'>
      <div className='w-full hidden md:block'>
        <UserMenu user={user} />
      </div>
      <div className='grid grid-cols-5 md:grid-cols-1 grid-flow-row fixed bottom-0 left-0 w-full bg-primary md:overflow-visible overflow-hidden z-50 md:relative h-16 md:h-auto'>
        <Button
          asChild
          className={cn(
            'w-full md:w-auto h-full md:h-10 justify-start md:rounded-none rounded-none transition',
            pathname === '/dashboard' ? 'md:translate-x-2 md:rounded-s-full' : ''
          )}
          variant={
        pathname === '/dashboard' ? 'secondary' : 'ghost'
      }
        >
          <Link
            className='flex flex-col md:flex-row md:items-center justify-center md:justify-start md:gap-3'
            href='/dashboard'
          >
            <HomeIcon className='md:w-5 md:h-5 w-7 h-7' />
            <span className='text-[8px] sm:text[10px] md:text-sm'>Dashboard</span>
          </Link>
        </Button>
        <ButtonMenu
          label='Colleagues'
          href='/dashboard/employees'
          icon={<Users2Icon className='md:w-5 md:h-5 w-7 h-7' />}
        />
        <ButtonMenu
          label='News'
          href='/dashboard/news'
          icon={<PartyPopperIcon className='md:w-5 md:h-5 w-7 h-7' />}
        />
        <ButtonMenu
          label='Time Off'
          href='/dashboard/time-off'
          icon={<PlaneIcon className='md:w-5 md:h-5 w-7 h-7' />}
        />
        <ButtonMenu
          label='Benefits'
          href='/dashboard/benefits'
          icon={<MedalIcon className='md:w-5 md:h-5 w-7 h-7' />}
        />

      </div>

      <div className='w-full hidden md:flex justify-center items-center'>
        <img
          src='/assets/logo-2024-dark.svg'
          alt='Logo'
          className='w-[140px]'
        />
      </div>
    </div>
  )
}
