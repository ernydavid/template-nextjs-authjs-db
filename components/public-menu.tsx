'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { User2Icon } from 'lucide-react'
import { useState } from 'react'

export function PublicMenu () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu onOpenChange={() => setIsOpen(!isOpen)}>
      <DropdownMenuTrigger asChild>
        <Button
          className='group rounded-full flex items-center'
          size='icon'
          data-open={isOpen}
        >
          <div className='w-5 h-5 flex flex-col justify-between items-center'>
            <span className='w-full h-full pointer-events-none flex flex-col items-center justify-center text-inherit before:content-[""] before:block group-hover:opacity-80 before:h-px before:w-5 before:bg-primary-foreground before:rounded-full before:-translate-y-1 group-data-[open="true"]:before:translate-y-px group-data-[open="true"]:before:rotate-45 before:transition-transform before:duration-150 after:content-[""] after:block after:h-px  after:w-5 after:bg-primary-foreground after:rounded-full after:translate-y-1 group-data-[open="true"]:after:translate-y-0 group-data-[open="true"]:after:-rotate-45 after:transition-transform after:duration-150' />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-[360px]'
      >
        <DropdownMenuItem asChild>
          <Button
            asChild
            className='justify-start'
            variant='ghost'
          >
            <Link
              className='flex items-center gap-3'
              href='/auth/login'
            >
              <User2Icon className='w-4 h-4' />
              Login
            </Link>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
