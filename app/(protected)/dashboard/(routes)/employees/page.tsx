import { CalendarDaysIcon, PlusIcon, User2Icon } from 'lucide-react'
import { EmployeeCalendar } from '@/components/dashboard/calendar'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { auth } from '@/auth'
import { EmployeesTable } from '@/components/employees/employees-table'
import { getAllEmployees } from '@/actions/dashboard'
import { DashboardCardWrapper } from '@/components/dashboard-card-wrapper'

export default async function EmployeesPage ({ searchParams }: {
  searchParams?: {
    query?: string
  }
}) {
  const query = searchParams?.query || ''
  const session = await auth()
  const user = session?.user
  const allEmployees = await getAllEmployees(query)

  return (
    <div className='w-full h-full py-3 px-3 grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
      <DashboardCardWrapper
        className='col-span-1 lg:col-span-3 xl:col-span-4'
        title='Colleagues'
        iconTitle={<User2Icon className='w-5 h-5' />}
        actions={
          (user?.role === 'admin' || user?.role === 'management') &&
            <Button
              size='sm'
              className='rounded-full h-8'
              asChild
            >
              <Link
                href='/dashboard/employees/new-employee'
                className='flex items-center gap-2 '
              >
                <PlusIcon className='w-4 h-4' />
                <span>Add New</span>
              </Link>
            </Button>
        }
      >
        <div className='py-2 flex flex-col gap-3'>
          <SearchBar
            className='bg-secondary'
            placeholder='Search colleague'
          />
          <EmployeesTable
            key={query}
            allEmployees={allEmployees}
          />
        </div>
      </DashboardCardWrapper>
      <DashboardCardWrapper
        className='hidden xl:block xl:col-span-2 h-max'
        title='My Calendar'
        iconTitle={<CalendarDaysIcon className='w-5 h-5' />}
      >
        <EmployeeCalendar />
      </DashboardCardWrapper>
    </div>
  )
}
