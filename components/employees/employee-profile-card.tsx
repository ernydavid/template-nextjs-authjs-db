'use client'

import { DashboardCardWrapper } from '@/components/dashboard-card-wrapper'
import { AtSignIcon, PhoneCallIcon, SendHorizonalIcon, SettingsIcon, SmartphoneIcon, SquareUserRoundIcon, UserCog2Icon } from 'lucide-react'
import { InfoBadge } from '@/components/info-badge'
import { Button } from '@/components/ui/button'
import { cn, formattedName } from '@/lib/utils'
import { useCurrentRole } from '@/hooks/use-current-role'
import { UserType } from '@/db/schema/users'
import { EmployeePositionTableType, PersonalEmployeeInformationType } from '@/db/schema/employee'
import Link from 'next/link'
import { BsWhatsapp } from 'react-icons/bs'

interface EmployeeProfileCardProps {
  employee: UserType
  employeeJobInfo: EmployeePositionTableType[]
  employeePersonalInfo: PersonalEmployeeInformationType
}

export function EmployeeProfileCard ({ employee, employeeJobInfo, employeePersonalInfo }: EmployeeProfileCardProps) {
  const role = useCurrentRole()

  const phone = !employeePersonalInfo?.phone ? '---' : employeePersonalInfo.phone
  const cellPhone = !employeePersonalInfo?.cellPhone ? '---' : employeePersonalInfo.cellPhone

  return (
    <DashboardCardWrapper
      title={`${employee.name}'s profile`}
      iconTitle={<SquareUserRoundIcon className='w-5 h-5' />}
      actions={role !== 'admin' && role !== 'management'
        ? (
            null
          )
        : (
          <Button
            size='sm'
            className='rounded-full h-8'
            variant='outline'
            asChild
          >
            <Link
              className='flex items-center gap-2'
              href={`/dashboard/employees/${employee.id}/edit`}
            >
              <SettingsIcon className='w-4 h-4' />
              <span>Manage</span>
            </Link>
          </Button>
          )}
    >
      <div className='w-full flex flex-col lg:flex-row lg:items-start items-center py-4 gap-6 lg:px-6'>
        <div className='relative'>
          <div className='w-40 h-40 rounded-full overflow-hidden flex-shrink-0'>
            <div className='w-40 h-40 bg-gradient-to-br from-primary to-sky-500 flex justify-center items-center'>
              <p className='text-4xl font-semibold text-primary-foreground'>{formattedName(employee?.name)}</p>
            </div>
          </div>
          <div className='w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-primary text-primary-foreground flex-shrink-0 absolute bottom-0 right-3 z-10'>
            {employeeJobInfo.length !== 0 && (
              <img
                className='h-10 object-cover object-center'
                src={`https://flagcdn.com/${employeeJobInfo[0].iso2Name?.toLowerCase()}.svg`}
                alt={`${employeeJobInfo[0].country} flag`}
              />
            )}
          </div>
        </div>
        <div className='flex flex-col gap-4 tracking-tight leading-tight flex-1 items-center lg:items-start'>
          <div className='flex gap-6 items-center'>
            <p className='text-xl font-bold'>{employee.name}</p>
            <div className='flex items-center gap-2'>
              <InfoBadge
                className={cn(
                  'bg-primary hover:bg-primary/80 text-primary-foreground',
                  employee.role === 'admin' ? 'bg-emerald-500 hover:bg-emerald-400' : '',
                  employee.role === 'management' ? 'bg-yellow-500 hover:bg-yellow-400' : ''
                )}
              >
                {employee.role}
              </InfoBadge>
            </div>
          </div>
          <div className='flex flex-col gap-2 text-sm'>
            <div className='flex gap-2'>
              <AtSignIcon className='w-5 h-5' />
              <div className='flex flex-col gap-1'>
                <p className='font-semibold'>{employee.email}</p>
                {(role !== 'admin' && role !== 'management') && (
                  <InfoBadge
                    className={cn(
                      'text-primary-foreground',
                      employee.emailVerified ? 'bg-emerald-400 hover:bg-emerald-300' : 'bg-destructive hover:bg-destructive/80'
                    )}
                  >
                    {employee.emailVerified ? 'Email verified' : 'Email not verified!'}
                  </InfoBadge>
                )}
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <PhoneCallIcon className='w-5 h-5' />
              <p className='font-semibold'>{phone}</p>
            </div>
            <div className='flex items-center gap-2'>
              <SmartphoneIcon className='w-5 h-5' />
              <p className='font-semibold'>{cellPhone}</p>
            </div>
            <div className='flex gap-2'>
              <UserCog2Icon className='w-5 h-5' />
              <div className='flex flex-col gap-1'>
                <p className='font-semibold'>Position:</p>
                {employeeJobInfo.length === 0
                  ? (
                      'No positions Assigned!'
                    )
                  : (
                    <>
                      <InfoBadge>{employeeJobInfo[0].position}</InfoBadge>
                      <InfoBadge>{employeeJobInfo[0].department}</InfoBadge>
                    </>
                    )}
                <div className='flex items-center gap-2'>
                  {employeeJobInfo.length === 0
                    ? (
                        'No country Assigned!'
                      )
                    : (
                      <InfoBadge
                        icon='address'
                      >{employeeJobInfo[0].country}
                      </InfoBadge>
                      )}
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-3 flex-wrap'>
            {employeePersonalInfo && (
              <Button
                className='h-8 rounded-full'
                size='sm'
                asChild
              >
                <Link
                  href={`https://wa.me/${phone.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '')}?text=Hello!`}
                  className='flex items-center gap-2'
                >
                  <BsWhatsapp className='w-4 h-4' />
                  <span>Message</span>
                </Link>
              </Button>
            )}
            <Button
              size='sm'
              className='h-8 flex items-center gap-2 rounded-full'
            >
              <SendHorizonalIcon className='w-4 h-4' />
              <span>Message</span>
            </Button>
          </div>
        </div>
      </div>
    </DashboardCardWrapper>
  )
}
