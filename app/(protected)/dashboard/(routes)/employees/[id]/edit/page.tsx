import { getEmployeeContractById } from '@/actions/contracts'
import { getAllCountries } from '@/actions/countries'
import { getAllDepartments } from '@/actions/departments'
import { getEmployeeJobInfoById } from '@/actions/employee'
import { getAllPositions } from '@/actions/positions'
import { DeleteEmployeeDialog } from '@/components/admin/employees/delete-employee-dialog'
import { DashboardCardWrapper } from '@/components/dashboard-card-wrapper'
import { EmployeeContractTable } from '@/components/edit-manage-employees/employee-contract-table'
import { EmployeePositionsTable } from '@/components/edit-manage-employees/employee-positions-table'
import { NewEmployeeContractsDialog } from '@/components/edit-manage-employees/new-employee-contract-dialog'
import { NewEmployeePositionDialog } from '@/components/edit-manage-employees/new-employee-position-dialog'
import { EditEmployeeForm } from '@/components/employees/edit-employee-form'
import { getUserById } from '@/data/user'
import { currentRole } from '@/lib/auth'
import { AlertCircleIcon, FileBadgeIcon, SettingsIcon, UserCog2Icon, UserIcon } from 'lucide-react'
import Link from 'next/link'

export default async function EditPage ({ params }: {
  params: {
    id: string
  }
}) {
  const id = params.id
  const role = await currentRole()
  const user = await getUserById(id)
  const employeeData = await getEmployeeJobInfoById(id)
  const allCountries = await getAllCountries()
  const allDepartments = await getAllDepartments()
  const allPositions = await getAllPositions()
  const employeeContract = await getEmployeeContractById(id)

  if (role !== 'admin' && role !== 'management') {
    return (
      <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
        <AlertCircleIcon className='w-5 h-5' />
        <p className='text-lg text-destructive'>Oppss... Something went wrong!</p>
        <p className='text-muted-foreground'>Not authorized</p>
        <Link
          href='/dashboard/employees'
        >
          Go back
        </Link>
      </div>
    )
  }

  if (!user) {
    return { error: 'User not found!' }
  }

  return (
    <div className='w-full h-full pt-3 flex flex-col p-3 tracking-tight gap-3 rounded-xl'>
      <div className='flex items-center justify-between'>
        <div className='py-3 flex items-center gap-2'>
          <SettingsIcon className='w-5 h-5' />
          <p className='text-xl font-semibold'>{`${user.name}'s Information Panel`}</p>
        </div>
        <div>
          <DeleteEmployeeDialog id={id} />
        </div>
      </div>
      <div className='w-full grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
        <div className='col-span-1 md:col-span-2'>
          <DashboardCardWrapper
            className='border border-muted'
            title='Basic Info & Role Account'
            iconTitle={<UserIcon className='w-5 h-5' />}
          >
            <EditEmployeeForm user={user} />
          </DashboardCardWrapper>
        </div>
        <div className='col-span-1 md:col-span-2'>
          <DashboardCardWrapper
            className='border border-muted'
            title='Manage Functions & Departments'
            iconTitle={<UserCog2Icon className='w-5 h-5' />}
            actions={
              <NewEmployeePositionDialog
                employeeId={id}
                allCountries={allCountries}
                allDepartments={allDepartments}
                allPositions={allPositions}
              />
            }
          >
            <EmployeePositionsTable
              allCountries={allCountries}
              allPositions={allPositions}
              allDepartments={allDepartments}
              employeeData={employeeData}
            />
          </DashboardCardWrapper>
        </div>
        <div className='col-span-1 md:col-span-2 xl:col-span-4'>
          <DashboardCardWrapper
            title='Manage Employee Contract'
            iconTitle={<FileBadgeIcon className='w-5 h-5' />}
            actions={
              !employeeContract && (
                <NewEmployeeContractsDialog
                  employeeId={id}
                />
              )
            }
          >
            <EmployeeContractTable
              employeeContract={employeeContract}
            />
          </DashboardCardWrapper>
        </div>
      </div>

    </div>
  )
}
