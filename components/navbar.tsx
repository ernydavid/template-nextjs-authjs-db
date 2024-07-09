import { UserMenu } from '@/components/auth/user-menu'
// import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PublicMenu } from '@/components/public-menu'
import { FeedbackDialog } from './feedback-dialog'
import { ThemeToggle } from './theme-toggle'
import { auth } from '@/auth'

export async function Navbar () {
  const session = await auth()

  return (
    <div className='w-full h-16 p-4 fixed top-0 left-0 bg-background/80 backdrop-blur-md z-50 mx-auto'>
      <div className='flex h-full justify-between items-center'>
        <div className='flex items-center gap-2'>
          <Button
            asChild
            variant='link'
          >
            <Link
              href='/'
            >
              <img
                src='/assets/logo-2024.svg'
                alt='Logo'
                className='w-[120px] dark:hidden block'
              />
              <img
                src='/assets/logo-2024-dark.svg'
                alt='Logo'
                className='w-[120px] hidden dark:block'
              />
            </Link>
          </Button>
        </div>
        <div className='flex items-center justify-end gap-4'>
          <FeedbackDialog />
          <ThemeToggle />
          {!session
            ? <PublicMenu />
            : <UserMenu user={session.user} />}
        </div>
      </div>

    </div>
  )
}
