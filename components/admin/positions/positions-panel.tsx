'use client'

import { UserRoundCogIcon } from 'lucide-react'
import { NewPositionDialog } from './new-position-dialog'
import { DashboardCardWrapper } from '@/components/dashboard-card-wrapper'
import { PositionsTable } from './positions-table'

interface DepartmentsPanelProps {
  positions: any[]
}

export function PositionsPanel ({ positions }: DepartmentsPanelProps) {
  return (
    <DashboardCardWrapper
      iconTitle={<UserRoundCogIcon className='w-5 h-5' />}
      title='Job Positions'
      actions={<NewPositionDialog />}
    >
      <div className='w-full flex flex-col gap-3'>
        <div className='w-full flex'>
          <PositionsTable positions={positions} />
        </div>
      </div>
    </DashboardCardWrapper>
  )
}
