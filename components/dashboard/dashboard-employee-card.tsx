'use client'

import { AtSignIcon, Edit3Icon, GlobeIcon, PhoneCallIcon, SquareUserIcon, UserCog2Icon } from 'lucide-react'
import { DashboardCardWrapper } from '../dashboard-card-wrapper'
import { cn, formattedName } from '@/lib/utils'
import { EmployeePositionTableType, PersonalEmployeeInformationType } from '@/db/schema/employee'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { UserRole } from '@/next-auth'
import { User } from 'next-auth'

interface DashboardEmployeeCardProps {
  user: (User & {
    role: UserRole
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  }) | undefined
  employeeJobInfo: EmployeePositionTableType[],
  employeePersonal: PersonalEmployeeInformationType | undefined
}

export function DashboardEmployeeCard ({ user, employeeJobInfo, employeePersonal }: DashboardEmployeeCardProps) {
  return (
    <DashboardCardWrapper
      title='My Information'
      iconTitle={<SquareUserIcon className='w-5 h-5' />}
      actions={
        <Button
          size='sm'
          className='rounded-full h-8'
          variant='outline'
          asChild
        >
          <Link
            className='flex items-center gap-2'
            href='/settings'
          >
            <Edit3Icon className='w-4 h-4' />
            <span>Edit</span>
          </Link>
        </Button>
      }
    >
      <div className='w-full flex flex-col lg:flex-row lg:items-start items-center py-4 gap-6 lg:px-6'>
        <div className='relative'>
          <div className='w-40 h-40 rounded-full overflow-hidden flex-shrink-0'>
            <div className='w-40 h-40 bg-gradient-to-br from-primary to-sky-500 flex justify-center items-center'>
              <p className='text-4xl font-semibold text-primary-foreground'>{formattedName(user?.name)}</p>
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
            <p className='text-xl font-bold'>{user?.name}</p>
            <p className={cn(
              'text-xs px-2 py-1 rounded-full bg-primary text-primary-foreground',
              user?.role === 'admin' ? 'bg-emerald-500' : '',
              user?.role === 'management' ? 'bg-yellow-500' : ''
            )}
            >{user?.role}
            </p>
          </div>
          <div className='flex flex-col gap-2 text-sm'>
            <div className='flex items-center gap-2'>
              <AtSignIcon className='w-5 h-5' />
              <p className='font-semibold'>{user?.email}</p>
            </div>
            {employeePersonal?.cellPhone
              ? (
                <div className='flex items-center gap-2'>
                  <PhoneCallIcon className='w-5 h-5' />
                  <p className='font-semibold'>{employeePersonal?.phone}</p>
                </div>
                )
              : (
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <PhoneCallIcon className='w-5 h-5' />
                  <p className='font-semibold' />
                </div>
                )}
            {employeeJobInfo.length !== 0
              ? (
                <>
                  <div className='flex gap-2'>
                    <UserCog2Icon className='w-5 h-5' />
                    <p className='font-semibold'>Positions:</p>
                    <div className='flex flex-col gap-1'>
                      <p>{employeeJobInfo[0].position}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <GlobeIcon className='w-5 h-5' />
                    <p className='font-semibold'>Hubs:</p>
                    <p>{employeeJobInfo[0].country}</p>
                  </div>
                </>
                )
              : (
                <>
                  <div className='flex gap-2 text-muted-foreground'>
                    <UserCog2Icon className='w-5 h-5' />
                    <p className='font-semibold'>Positions:</p>
                    <div className='flex flex-col gap-1' />
                  </div>
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <GlobeIcon className='w-5 h-5' />
                    <p className='font-semibold'>Hubs:</p>
                    <p />
                  </div>
                </>
                )}

          </div>
        </div>
      </div>
    </DashboardCardWrapper>
  )
}
