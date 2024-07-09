'use client'

import { Globe2Icon } from 'lucide-react'
import { NewCountryDialog } from './new-country-dialog'
import { DashboardCardWrapper } from '@/components/dashboard-card-wrapper'

interface CountriesPanelProps {
  countries: any[]
}

export function CountriesPanel ({ countries }: CountriesPanelProps) {
  return (
    <DashboardCardWrapper
      iconTitle={<Globe2Icon className='w-5 h-5' />}
      title='Countries'
      actions={<NewCountryDialog />}
    >
      <div className='w-full flex flex-col gap-3'>
        <div className='w-full flex' />
      </div>
    </DashboardCardWrapper>
  )
}
