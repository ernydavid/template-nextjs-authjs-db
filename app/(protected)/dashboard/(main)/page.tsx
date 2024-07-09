import { getAllCountCountries, getAllCountEmployees, getEmployeeBasicInformation } from '@/actions/dashboard'
import { getAllDepartments } from '@/actions/departments'
import { getEmployeeJobInfoById } from '@/actions/employee'
import { DashboardCardWrapper } from '@/components/dashboard-card-wrapper'
import { DashboardEmployeeCard } from '@/components/dashboard/dashboard-employee-card'
import { DashboardCardsWrapper, DashboardSmallCardCounts } from '@/components/dashboard/small-card'
import { InfoBadge } from '@/components/info-badge'
import { Button } from '@/components/ui/button'
import { currentUser } from '@/lib/auth'
import { calculateWorkedTimeFormatted, shortestId } from '@/lib/utils'
import { AlertCircleIcon, BookUserIcon, BriefcaseIcon, CheckCircleIcon, Edit3Icon, ListChecksIcon, MessageCircleIcon, NetworkIcon, PlusIcon, UserCircle2Icon, UserCog2Icon } from 'lucide-react'
import Link from 'next/link'
import { IoEarth } from 'react-icons/io5'

export default async function DashboardPage () {
  const totalEmployees = await getAllCountEmployees()
  const totalCountries = await getAllCountCountries()
  const totalDepartments = await getAllDepartments()
  const user = await currentUser()
  const employeeJobInfo = await getEmployeeJobInfoById(user?.id as string)

  const { employeePosition, employeePersonal, employeeContract } = await getEmployeeBasicInformation()
  const today = new Date().getFullYear()

  return (
    <div className='w-full h-full pt-3 flex flex-col p-3 tracking-tight gap-3'>
      <DashboardCardsWrapper>
        <DashboardSmallCardCounts
          title='Countries'
          iconTitle={<IoEarth className='w-10 h-10' />}
          total={totalCountries.toString()}
        />
        <DashboardSmallCardCounts
          title='Colleagues'
          iconTitle={<UserCircle2Icon className='w-10 h-10' />}
          total={totalEmployees.toString()}
        />
        <DashboardSmallCardCounts
          title='Departments'
          iconTitle={<BriefcaseIcon className='w-10 h-10' />}
          total={totalDepartments.length.toString()}
        />
      </DashboardCardsWrapper>
      <div className='w-full grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
        <div
          className='col-span-1 lg:col-span-2 xl:col-span-4'
        >
          <DashboardEmployeeCard
            user={user}
            employeeJobInfo={employeeJobInfo}
            employeePersonal={employeePersonal}
          />
        </div>
        <div className='col-span-1 xl:col-span-2'>
          <DashboardCardWrapper
            title='Messages'
            iconTitle={<MessageCircleIcon className='w-5 h-5' />}
            actions={
              <Button
                className='rounded-full h-8 flex items-center gap-2'
                variant='secondary'
                size='sm'
              >
                <PlusIcon className='w-4 h-4' />
                <span>New</span>
              </Button>
            }
          >
            <div className='w-full h-full py-4 flex flex-col items-center justify-center gap-3 text-muted-foreground tracking-tight text-sm'>
              <CheckCircleIcon className='w-5 h-5' />
              <p className='text-center'>Messages coming soon!</p>
            </div>
          </DashboardCardWrapper>
        </div>
        <div className='col-span-1 lg:col-span-2 xl:col-span-4'>
          <DashboardCardWrapper
            title='Basic Information'
            iconTitle={<BookUserIcon className='w-5 h-5' />}
          >
            <div className='w-full flex flex-col gap-6 text-sm tracking-tight pt-3'>
              <div className='flex flex-col gap-4'>
                <div className='w-full flex justify-between items-center gap-2'>
                  <p className='text-base font-semibold text-foreground'>Employee Information</p>
                  <p className='text-xs text-muted-foreground'>(Non-editable)</p>
                </div>
                {!employeeContract?.employeeContracts
                  ? (
                    <div className='w-full h-full flex flex-col justify-center items-center gap-1 text-center text-muted-foreground py-3'>
                      <AlertCircleIcon className='w-5 h-5' />
                      <p className='text-sm'>Your contract is not added yet!</p>
                      <p className='text-xs text'>Contact Area Manager</p>
                    </div>
                    )
                  : (
                    <div className='flex items-start flex-wrap gap-2'>
                      <div className='flex flex-col items-start gap-1 col-span-2'>
                        <p className='font-semibold'>Hire date</p>
                        <InfoBadge
                          icon='date'
                          className='bg-primary text-primary-foreground hover:bg-primary/80'
                        >
                          {employeeContract?.employeeContracts?.hireDate?.toDateString()}
                        </InfoBadge>
                      </div>
                      <div className='flex flex-col items-start gap-1 col-span-2'>
                        <p className='font-semibold'>Worked time</p>
                        <InfoBadge
                          icon='date'
                          className='bg-primary text-primary-foreground hover:bg-primary/80'
                        >
                          {employeeContract?.employeeContracts.hireDate ? calculateWorkedTimeFormatted(employeeContract.employeeContracts.hireDate) : '---'}
                        </InfoBadge>
                      </div>
                      <div className='flex flex-col items-start gap-1 col-span-2'>
                        <p className='font-semibold'>Contract type</p>
                        <InfoBadge
                          icon='date'
                          className='bg-primary text-primary-foreground hover:bg-primary/80'
                        >
                          {employeeContract?.employeeContracts.contractType}
                        </InfoBadge>
                      </div>
                      <div className='flex flex-col items-start gap-1 col-span-2'>
                        <p className='font-semibold'>Employee ID</p>
                        <InfoBadge
                          icon='user'
                          className='bg-primary text-primary-foreground hover:bg-primary/80'
                        >
                          {shortestId(user?.id)}
                        </InfoBadge>
                      </div>
                    </div>
                    )}
              </div>
              <div className='flex flex-col gap-4'>
                <div className='w-full flex justify-between items-center gap-2'>
                  <p className='text-base font-semibold text-foreground'>Personal Information</p>
                  <Button
                    size='icon'
                    className='rounded-full h-8'
                    variant='link'
                    asChild
                  >
                    <Link
                      className='flex items-center gap-2'
                      href='/settings'
                    >
                      <Edit3Icon className='w-4 h-4' />
                    </Link>
                  </Button>
                </div>
                {!employeePersonal
                  ? (
                    <div className='w-full h-full flex flex-col justify-center items-center gap-1 text-center text-muted-foreground py-3'>
                      <AlertCircleIcon className='w-5 h-5' />
                      <p className='text-sm'>No personal information added!</p>
                      <p className='text-xs text'>Please go to my account</p>
                    </div>
                    )
                  : (
                    <div className='flex items-start flex-wrap gap-2'>
                      <div className='flex flex-col items-start gap-1 col-span-2'>
                        <p className='font-semibold'>Address</p>
                        <InfoBadge
                          icon='address'
                        >
                          {employeePersonal?.address}
                        </InfoBadge>
                      </div>
                      <div className='flex flex-col items-start gap-1 col-span-2'>
                        <p className='font-semibold'>Date of Birth</p>
                        <InfoBadge
                          icon='date'
                        >
                          {employeePersonal?.birthDate?.toDateString()}
                        </InfoBadge>
                      </div>
                      <div className='flex flex-col items-start gap-1 col-span-2'>
                        <p className='font-semibold'>Age</p>
                        <InfoBadge
                          icon='date'
                        >
                          {employeePersonal?.birthDate && today - employeePersonal?.birthDate.getFullYear()}
                        </InfoBadge>
                      </div>
                    </div>
                    )}
              </div>
              <div className='flex flex-col gap-4'>
                <div className='w-full flex justify-between items-center gap-2'>
                  <p className='text-base font-semibold text-foreground'>Ocupation Information</p>
                  <p className='text-xs text-muted-foreground'>(Not-Editable)</p>
                </div>
                <div className='flex flex-col gap-2'>
                  {employeePosition?.length === 0 && (
                    <div className='w-full h-full flex flex-col justify-center items-center gap-1 text-center text-muted-foreground py-3'>
                      <AlertCircleIcon className='w-5 h-5' />
                      <p className='text-sm'>No positions & departments assigned yet!</p>
                      <p className='text-xs text'>Contact Area Manager</p>
                    </div>
                  )}
                  {employeePosition?.map((item, index) => (
                    <div
                      key={index}
                      className='w-full flex items-center gap-3 flex-wrap p-3 border rounded-xl'
                    >
                      <div className='flex-1 flex items-center gap-2'>
                        <div className='w-9 h-9 rounded-full flex items-center justify-center overflow-hidden bg-primary text-primary-foreground flex-shrink-0'>
                          <UserCog2Icon className='w-5 h-5' />
                        </div>
                        <div className='flex flex-col'>
                          <p className='font-bold'>{item.position}</p>
                        </div>
                      </div>
                      <div className='flex flex-1 items-center gap-2'>
                        <div className='w-9 h-9 rounded-full flex items-center justify-center overflow-hidden bg-primary text-primary-foreground flex-shrink-0'>
                          <img
                            className='h-9 object-cover object-center'
                            src={`https://flagcdn.com/${item.iso2Name?.toLowerCase()}.svg`}
                            alt={`${item.country} flag`}
                          />
                        </div>
                        <div className='flex flex-col'>
                          <p className='font-bold'>{item.country}</p>
                        </div>
                      </div>
                      <div className='flex flex-1 items-center gap-2'>
                        <div className='w-9 h-9 rounded-full flex items-center justify-center overflow-hidden bg-primary text-primary-foreground flex-shrink-0'>
                          <NetworkIcon className='w-5 h-5' />
                        </div>
                        <div className='flex flex-col'>
                          <p className='font-bold'>{item.department}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DashboardCardWrapper>
        </div>
        <div className='col-span-1 xl:col-span-2'>
          <DashboardCardWrapper
            title='Onboarding'
            iconTitle={<ListChecksIcon className='w-5 h-5' />}
            actions={
              <Button
                className='rounded-full h-8 flex items-center gap-2'
                variant='secondary'
                size='sm'
              >
                <PlusIcon className='w-4 h-4' />
                <span>New</span>
              </Button>
            }
          >
            <div className='w-full h-full py-4 flex flex-col items-center justify-center gap-3 text-muted-foreground tracking-tight text-sm'>
              <AlertCircleIcon className='w-5 h-5' />
              <p className='text-center'>No Tasks Assigned!</p>
            </div>
          </DashboardCardWrapper>
        </div>
      </div>
    </div>
  )
}
