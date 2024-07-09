import {
  Card,
  CardHeader,
  CardContent
} from '@/components/ui/card'
import { ChevronLeftCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CredentialsCardProps {
  title: string
  subtitle: string
  image?: string | null
  imageAlt?: string
  imagefirst?: boolean
  imageContain?: boolean
  showIcon?: boolean
  backButtonLabel?: string
  backButtonHref?: string
  children: React.ReactNode
}

export function CredentialsCard ({
  children,
  title,
  subtitle,
  image,
  imageAlt,
  imagefirst,
  imageContain,
  showIcon,
  backButtonLabel,
  backButtonHref
}: CredentialsCardProps) {
  return (
    <Card className={cn(
      'w-full md:w-[760px] md:h-[480px] border-none bg-gradient-to-b from-[#033868] to-[#095299] text-white flex overflow-hidden rounded-2xl relative',
      imagefirst ? 'flex-row' : 'flex-row-reverse')}
    >
      {backButtonHref && backButtonLabel
        ? (
          <Link
            className='absolute top-5 left-5'
            href={backButtonHref}
          >
            <ChevronLeftCircleIcon className='w-6 h-6 text-white hover:text-white/80 transition' />
            <span className='sr-only'>{backButtonLabel}</span>
          </Link>
          )
        : null}
      {image &&
        <CardHeader className='w-[100px] md:w-[310px] flex-1 h-full p-0 rounded-lg overflow-hidden md:flex-initial md:flex-shrink-0 object-cover'>
          <img
            className={cn(
              'w-full h-full hidden md:block',
              imageContain ? 'object-contain px-8' : 'object-cover'
            )}
            src={image}
            alt={imageAlt}
          />
        </CardHeader>}
      <div className='w-full h-full flex flex-col justify-center p-0 py-6 px-6'>
        <CardContent className='w-full px-2 md:mt-4 mt-8 flex flex-col gap-4'>
          <div className='flex flex-col'>
            {showIcon &&
              <img
                className='w-12 h-12 mb-4 hidden md:flex'
                src='/icon-light.svg'
                alt='Icon of 5999 Cargo'
              />}
            <p className='text-4xl font-bold tracking-tighter'>{title}</p>
            <p className='text-white/60 tracking-tighter'>{subtitle}</p>
          </div>
          {/** Login Form */}
          <div className='w-full'>
            {children}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
