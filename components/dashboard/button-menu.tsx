'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ButtonMenuProps {
  label: string
  href: string
  icon: React.ReactNode
}
export function ButtonMenu ({ label, href, icon }: ButtonMenuProps) {
  const pathname = usePathname()

  return (
    <Button
      asChild
      className={cn(
        'w-full md:w-auto h-full md:h-10 justify-start md:rounded-none rounded-none transition',
        pathname.includes(href) ? 'md:translate-x-2 md:rounded-s-full' : ''
      )}
      variant={
        pathname.includes(href) ? 'secondary' : 'ghost'
      }
    >
      <Link
        className='flex flex-col md:flex-row md:items-center justify-center md:justify-start md:gap-3'
        href={href}
      >
        {icon}
        <span className='text-[8px] sm:text[10px] md:text-sm'>{label}</span>
      </Link>
    </Button>
  )
}
