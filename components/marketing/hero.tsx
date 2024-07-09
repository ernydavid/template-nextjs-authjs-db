import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero () {
  return (
    <div className='w-full flex flex-col gap-8'>
      <img
        className='w-full h-[170px] object-cover object-left'
        src='/assets/hero-image.png'
        alt='Hero Section Image'
      />
      <div className='w-full flex flex-col gap-4 text-foreground'>
        <h1 className='font-bold tracking-tighter text-4xl md:text-6xl text-center'>
          Welcome to the  Employee portal
        </h1>
        <p className='w-full max-w-[800px] text-center mx-auto'>Our portal offers tools and resources to enhance your work experience, keeping you informed and connected with important policies, benefits, company news, and upcoming events.</p>
        <div className='w-full flex justify-center'>
          <Button
            className='px-12 rounded-full font-bold tracking-tight'
            asChild
          >
            <Link href='/auth/login'>
              Enter to Employee Portal
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
