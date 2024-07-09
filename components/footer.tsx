import Link from 'next/link'

export function Footer () {
  return (
    <div className='hidden w-full h-10 p-4 md:flex justify-end items-center gap-3 fixed bottom-2 left-0 text-xs font-bold transition-colors bg-transparent'>
      <Link
        className='group transition hover:text-muted-foreground'
        href='/faq'
      >
        FAQ
      </Link>
      <Link
        className='transition hover:text-muted-foreground'
        href='/terms'
      >
        Terms
      </Link>
      <Link
        className='transition hover:text-muted-foreground'
        href='/privacy'
      >
        Privacy
      </Link>
      <Link
        className='transition hover:text-muted-foreground'
        href='/policy'
      >
        Policy
      </Link>
      <Link
        href='/'
      >
        <img
          src='/icon-dark.svg'
          alt='isotipo logo'
          className='w-6 dark:hidden'
        />
        <img
          src='/icon-light.svg'
          alt='isotipo logo'
          className='w-6 hidden dark:block'
        />
      </Link>
    </div>
  )
}
