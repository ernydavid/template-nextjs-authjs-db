import { cn } from '@/lib/utils'
import { ChevronsRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

interface StoryCardProps {
  title: string
  subtitle?: string
  cardImage?: string
  storyLink?: string
  className?: string
}

export function StoryCard ({
  title,
  subtitle,
  cardImage,
  storyLink,
  className
}: StoryCardProps) {
  return (
    <div className={cn(
      'group w-full h-full flex flex-col gap-2 rounded-2xl bg-background bg-gradient-to-br from-primary to-sky-700 relative',
      className
    )}
    >
      {cardImage && (
        <div className='w-full h-full flex justify-end overflow-hidden'>
          <img
            className='group-hover:hue-rotate-15 transition ease-in-out group-hover:translate-x-24 h-[500px] object-right overflow-hidden rotate-[30deg] duration-500'
            src={cardImage}
            alt={`${title} image`}
          />
        </div>
      )}
      <div className='w-full h-full flex flex-col justify-between absolute top-0 left-0 px-4 py-6 text-white tracking-tight gap-3'>
        <div className='flex flex-col'>
          <p className='font-semibold text-2xl shadow-text'>{title}</p>
          <p className='text-7xl font-bold tracking-tighter shadow-text uppercase'>{subtitle}</p>
          <div className='flex'>
            <Button
              size='sm'
              variant='secondary'
              className='flex rounded-full h-8'
              asChild
            >
              <Link
                href='/dashboard/news/magazine'
              >
                Enter to magazine
              </Link>
            </Button>
          </div>
        </div>
        <div className='w-full flex items-center justify-end px-3'>
          <Link
            className='group transition hover:text-white/70'
            href='/dashboard/news/magazine'
          >
            <div className='flex items-center gap-2'>
              <span className='text-sm font-semibold'>See more...</span>
              <ChevronsRightIcon className='w-5 h-5 group-hover:translate-x-2 group-hover:transition group-hover:text-white/70' />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
