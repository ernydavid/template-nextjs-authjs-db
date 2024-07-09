'use client'

import { cn } from '@/lib/utils'

interface DashboardCardWrapperProps {
  children: React.ReactNode
  title: string
  iconTitle?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function DashboardCardWrapper ({
  children,
  title,
  iconTitle,
  actions,
  className
}: DashboardCardWrapperProps) {
  return (
    <div className={cn(
      'w-full h-full py-3 px-4 border-none shadow-none overflow-hidden rounded-2xl bg-background tracking-tighter',
      className
    )}
    >
      <div className='w-full flex items-center justify-between gap-2 py-2 tracking-tighter'>
        <div className='flex items-center gap-2 text-foreground'>
          {iconTitle}
          <p className='md:text-lg text-base font-bold leading-tight'>{title}</p>
        </div>
        <div>
          {actions}
        </div>
      </div>
      <div className='p-0 px-2 pb-3 md:pb-0 w-full'>
        {children}
      </div>
    </div>
  )
}
