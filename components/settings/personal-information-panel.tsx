'use client'

import { AlertOctagonIcon, UserSquare2Icon } from 'lucide-react'
import { DashboardCardWrapper } from '../dashboard-card-wrapper'
import { PersonalEmployeeInformationType } from '@/db/schema/employee'
import { NewPersonalInfoDialog } from './new-personal-info-dialog'
import { InfoBadge } from '../info-badge'
import { UpdatePersonalInfoDialog } from './update-personal-info-dialog'

interface PersonalInformationPanelProps {
  idEmployee: string
  employeeInfo: PersonalEmployeeInformationType | null
}

export function PersonalInformationPanel ({
  idEmployee,
  employeeInfo
}: PersonalInformationPanelProps) {
  const today = new Date().getFullYear()

  if (!employeeInfo) {
    return (
      <DashboardCardWrapper
        iconTitle={<UserSquare2Icon className='w-5 h-5' />}
        title='Personal Information'
      >
        <div className='w-ful h-full flex flex-col justify-center items-center gap-2 py-4 text-sm'>
          <AlertOctagonIcon className='w-5 h-5 text-destructive' />
          <p className='text-destructive'>Personal information is not added!</p>
          <NewPersonalInfoDialog idEmployee={idEmployee} />
        </div>
      </DashboardCardWrapper>
    )
  }

  return (
    <DashboardCardWrapper
      title='Personal Information'
      iconTitle={<UserSquare2Icon className='w-5 h-5' />}
    >
      <div className='w-full h-full flex flex-col tracking-tight text-foreground text-sm gap-3 py-6'>
        {employeeInfo &&
          <div
            className='w-full flex flex-col gap-2'
            key={employeeInfo.id}
          >
            <div className='flex items-start flex-wrap gap-3'>
              <div className='flex flex-col items-start gap-1'>
                <p className='font-semibold'>Identification</p>
                <InfoBadge
                  icon='id'
                >
                  {employeeInfo.identification}
                </InfoBadge>
              </div>
              <div className='flex flex-col items-start gap-1 col-span-2'>
                <p className='font-semibold'>Address</p>
                <InfoBadge
                  icon='address'
                >
                  {employeeInfo.address}
                </InfoBadge>
              </div>
              <div className='flex flex-col items-start gap-1 col-span-2'>
                <p className='font-semibold'>Date of Birth</p>
                <InfoBadge
                  icon='date'
                >
                  {employeeInfo.birthDate?.toDateString()}
                </InfoBadge>
              </div>
              <div className='flex flex-col items-start gap-1 col-span-2'>
                <p className='font-semibold'>Age</p>
                <InfoBadge
                  icon='date'
                >
                  {employeeInfo.birthDate && today - employeeInfo.birthDate.getFullYear()}
                </InfoBadge>
              </div>
              <div className='flex flex-col items-start gap-1 col-span-2'>
                <p className='font-semibold'>Phone</p>
                <InfoBadge
                  icon='phone'
                >
                  {employeeInfo.phone}
                </InfoBadge>
              </div>
              <div className='flex flex-col items-start gap-1 col-span-2'>
                <p className='font-semibold'>Mobile Phone</p>
                <InfoBadge
                  icon='mobile'
                >
                  {employeeInfo.cellPhone}
                </InfoBadge>
              </div>
              <div className='flex flex-col items-start gap-1 col-span-2'>
                <p className='font-semibold'>Blood type</p>
                <InfoBadge
                  icon='syringe'
                  className='bg-destructive/40'
                >
                  {employeeInfo.bloodType}
                </InfoBadge>
              </div>
            </div>
          </div>}
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-center'>
          <UpdatePersonalInfoDialog personalInfo={employeeInfo} />
        </div>
        <p className='col-span-1 xl:col-span-2 text-center text-xs text-destructive'>
          *This information is only visible to you
        </p>
      </div>
    </DashboardCardWrapper>
  )
}
