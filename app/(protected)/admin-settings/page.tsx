import { getEmployeesWithoutContracts } from '@/actions/contracts'
import { getAllCountries } from '@/actions/countries'
import { getAllDepartments } from '@/actions/departments'
import { getEmployeesWithoutPosition } from '@/actions/employee'
import { getAllPositions } from '@/actions/positions'
import { AssignPositionDialog } from '@/components/admin/asign-positions/assign-position-dialog'
import { AssignContractsDialog } from '@/components/admin/contracts/assign-contracts-dialog'
import { NewCountryDialog } from '@/components/admin/countries/new-country-dialog'
import { DepartmentsPanel } from '@/components/admin/departments/departments-panel'
import { PositionsPanel } from '@/components/admin/positions/positions-panel'
import { DashboardCardWrapper } from '@/components/dashboard-card-wrapper'
import { Button } from '@/components/ui/button'
import { currentRole } from '@/lib/auth'
import { AlertCircleIcon, Globe2Icon, Settings2Icon } from 'lucide-react'
import Link from 'next/link'

export default async function AdminSettingsPage () {
  const role = await currentRole()
  const allCountries = await getAllCountries()
  const allDepartments = await getAllDepartments()
  const allPositions = await getAllPositions()
  const withoutContracts = await getEmployeesWithoutContracts()
  const withoutPositions = await getEmployeesWithoutPosition()

  if (role !== 'admin' && role !== 'management') {
    return (
      <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
        <AlertCircleIcon className='w-5 h-5 text-destructive' />
        <p className='text-lg text-destructive'>Oppss... Something went wrong!</p>
        <p className='text-muted-foreground'>Not authorized</p>
        <Link
          href='/dashboard/'
        >
          Go back
        </Link>
      </div>
    )
  }

  return (
    <div className='w-full h-full p-3 tracking-tight overflow-y-auto space-y-3 scrollbar-hide'>
      <div className='flex items-center gap-2'>
        <Settings2Icon className='w-5 h-5' />
        <p className='text-2xl font-bold'>Administrator Settings</p>
      </div>
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 overflow-y-auto gap-3'>
        <div className='grid grid-cols-1 gap-3'>
          <AssignContractsDialog
            employees={withoutContracts}
          />
          <AssignPositionDialog
            employees={withoutPositions}
            countries={allCountries}
            departments={allDepartments}
            positions={allPositions}
          />
        </div>
        <DashboardCardWrapper
          title='Manage Contries'
          iconTitle={<Globe2Icon className='w-5 h-5' />}
          actions={<NewCountryDialog />}
        >
          <div className='w-full h-full flex justify-center flex-col gap-2'>
            <Button
              size='icon'
              className='flex w-32 h-32 p-2'
              variant='secondary'
              asChild
            >
              <Link
                className='flex flex-col items-center gap-2'
                href='/admin-settings/countries'
              >
                <div className='flex items-center gap-2'>
                  <Globe2Icon className='w-10 h-10' />
                  <span className='text-3xl'>{allCountries.length}</span>
                </div>
                <p className='font-semibold'>View all Countries</p>
              </Link>
            </Button>
          </div>
        </DashboardCardWrapper>
        <DepartmentsPanel departments={allDepartments} />
        <PositionsPanel positions={allPositions} />

      </div>
    </div>
  )
}
