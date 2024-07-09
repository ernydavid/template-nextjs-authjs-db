import { auth } from '@/auth'
import { AsideBar } from '@/components/dashboard/aside-bar'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

async function ProtectedLayout ({ children }: ProtectedLayoutProps) {
  const session = await auth()
  return (
    <div className='w-full md:h-[calc(100%-20px)] h-[calc(100%-60px)]'>
      <div className='w-full h-full flex flex-col-reverse md:flex-row md:rounded-2xl overflow-hidden bg-secondary'>
        <div>
          {session
            ? <AsideBar user={session.user} />
            : null}
        </div>
        <div className='w-full h-full overflow-y-auto scrollbar-hide'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ProtectedLayout
