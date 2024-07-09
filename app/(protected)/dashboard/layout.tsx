import { DashboardNav } from '@/components/dashboard/dashboard-nav'

export default function LayoutDashboard ({ children }:
  {
    children: React.ReactNode
  }
) {
  return (
    <div className='w-full md:p-4 tracking-tight overflow-hidden'>
      <DashboardNav />
      <div className='w-full h-full overflow-y-auto scrollbar-hide'>
        {children}
      </div>
    </div>
  )
}
