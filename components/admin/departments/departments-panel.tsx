'use client'

import { BriefcaseIcon } from 'lucide-react'
import { NewDepartmentDialog } from './new-department-dialog'
import { DashboardCardWrapper } from '@/components/dashboard-card-wrapper'
import { DepartmentsTable } from './departments-table'

interface DepartmentsPanelProps {
  departments: any[]
}

export function DepartmentsPanel ({ departments }: DepartmentsPanelProps) {
  return (
    <DashboardCardWrapper
      iconTitle={<BriefcaseIcon className='w-5 h-5' />}
      title='Departments'
      actions={<NewDepartmentDialog />}
    >
      <div className='w-full flex flex-col gap-3'>
        <div className='w-full flex'>
          <DepartmentsTable departments={departments} />
        </div>
      </div>
    </DashboardCardWrapper>
  )
}
