import { cn } from '@/lib/utils'
import { ChevronsRightIcon } from 'lucide-react'
import Link from 'next/link'

interface TopStoryCardProps {
  title: string
  subtitle?: string
  cardImage?: string
  storyLink?: string
  className?: string
}

export function TopStoryCard ({
  title,
  subtitle,
  cardImage,
  storyLink,
  className
}: TopStoryCardProps) {
  return (
    <div className={cn(
      'group w-full h-full flex flex-col gap-2 rounded-2xl bg-background overflow-hidden relative',
      cardImage === null || cardImage === undefined ? 'bg-gradient-to-br from-primary to-sky-900' : '',
      className
    )}
    >
      {cardImage && (
        <img
          className='group-hover:hue-rotate-15 w-full h-[500px]'
          src={cardImage}
          alt={`${title} image`}
        />
      )}
      <div className='w-full h-full flex flex-col justify-end items-start absolute top-0 left-0 p-4 text-white tracking-tight gap-3'>
        <div className='flex flex-col'>
          <p className='font-semibold text-lg shadow-text'>{title}</p>
          <p className='text-5xl font-bold tracking-tighter shadow-text uppercase'>{subtitle}</p>
        </div>
        <div className='w-full flex items-center justify-end px-3'>
          <Link
            className='group transition hover:text-white/70'
            href='/dashboard/news/top-story'
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
