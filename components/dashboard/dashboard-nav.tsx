'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ChevronRight, LogOutIcon, SettingsIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function DashboardNav () {
  const pathname = usePathname()
  const date = format(new Date(), 'PPP')

  const routes = pathname.slice(1).split('/')

  return (
    <header className='hidden w-full md:flex lg:justify-between md:justify-end items-center text-muted-foreground text-sm z-50'>
      <div className='items-center gap-1 hidden lg:flex'>
        {routes.map((route, index) => (
          <div
            className='flex items-center gap-1'
            key={index}
          >
            <p className={cn(
              'font-semibold',
              routes.lastIndexOf(route) === routes.length - 1 ? 'text-primary' : ''
            )}
            >{route}
            </p>
            <ChevronRight className='w-4 h-4' />
          </div>
        ))}
      </div>

      <div className='flex items-center gap-2'>
        <p className='text-sm'>{date}</p>
        {/* <Button
          variant='ghost'
          size='icon'
          asChild
        >
          <Link href='/dashboard/messages'>
            <MessageSquareTextIcon className='w-4 h-4' />
          </Link>
        </Button> */}
        <Button
          variant='ghost'
          size='icon'
          asChild
        >
          <Link href='/settings'>
            <SettingsIcon className='w-4 h-4' />
          </Link>
        </Button>
        <Button
          variant='ghost'
          className='hover:text-destructive transition'
          size='icon'
          onClick={async () => await signOut()}
        >
          <LogOutIcon className='w-4 h-4' />
        </Button>
      </div>
    </header>
  )
}
