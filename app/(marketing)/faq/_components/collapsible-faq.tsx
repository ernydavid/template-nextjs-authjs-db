'use client'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useState } from 'react'

interface CollapsibleFAQProps {
  title: string
  content?: string
  children?: React.ReactNode
}

export function CollapsibleFAQ ({ children, title, content }: CollapsibleFAQProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible
      className='w-full md:w-[700px]'
      open={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
    >
      <CollapsibleTrigger
        className={cn(
          'w-full p-2 rounded-xl transition-all cursor-pointer hover:bg-secondary',
          isOpen ? 'bg-secondary' : ''
        )}
        asChild
      >
        <div className='w-full flex items-center justify-between gap-3'>
          <p className='text-base md:text-lg font-semibold'>{title}</p>
          <Button
            size='icon'
            className='rounded-full flex-shrink-0 transition-all'
            variant={isOpen ? 'default' : 'ghost'}
          >
            {
              !isOpen
                ? <ChevronDownIcon className='w-4 h-4' />
                : <ChevronUpIcon className='w-4 h-4' />
            }
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className='text-muted-foreground py-6 px-3'>
          {content}
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
