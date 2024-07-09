import { DashboardCardWrapper } from '@/components/dashboard-card-wrapper'
import { NewEmployeeForm } from '@/components/employees/new-employee-form'
import { MailIcon } from 'lucide-react'

export default function NewEmployeePage () {
  return (
    <div className='w-full h-full flex flex-col p-3 tracking-tight gap-3'>
      <div className='w-full grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 overflow-y-auto scrollbar-hide'>
        <div className='col-span-1 lg:col-span-2 xl:col-span-4'>
          <DashboardCardWrapper
            title='Send new Employee Invitation'
            iconTitle={<MailIcon className='w-5 h-5' />}
          >
            <NewEmployeeForm />
          </DashboardCardWrapper>
        </div>
      </div>
    </div>
  )
}
