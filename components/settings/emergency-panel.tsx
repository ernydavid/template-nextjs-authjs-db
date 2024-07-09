'use client'

import { AlertOctagonIcon, AmbulanceIcon, MapPinIcon, PhoneCallIcon, SquareUserRoundIcon, HeartIcon } from 'lucide-react'
import { DashboardCardWrapper } from '../dashboard-card-wrapper'
import { NewEmergencyContactsDialog } from '@/components/settings/new-emergency-contact-dialog'
import { EmergencyContactsType } from '@/db/schema/employee'
import { DeleteEmergencyContactDialog } from './delete-emergency-contact-dialog'
import { EditEmergencyContactDialog } from './edit-emergency-contact-dialog'
import { InfoBadge } from '../info-badge'

interface EmergencyContactsPanelProps {
  idEmployee: string
  emergencyContacts: EmergencyContactsType[]
}

export function EmergencyContactsPanel ({
  idEmployee,
  emergencyContacts
}: EmergencyContactsPanelProps) {
  if (emergencyContacts.length === 0) {
    return (
      <DashboardCardWrapper
        iconTitle={<AmbulanceIcon className='w-5 h-5' />}
        title='Emergency Information'
      >
        <div className='w-ful h-full flex flex-col justify-center items-center gap-2 text-sm'>
          <AlertOctagonIcon className='w-5 h-5 text-destructive' />
          <p className='text-destructive'>Not emergency contacts added!</p>
          <NewEmergencyContactsDialog idEmployee={idEmployee} />
        </div>
      </DashboardCardWrapper>
    )
  }
  return (
    <DashboardCardWrapper
      title='Emergency Information'
      iconTitle={<AmbulanceIcon className='w-5 h-5' />}
    >
      <div className='w-full h-full grid grid-cols-1 xl:grid-cols-2 place-content-center tracking-tight text-foreground text-sm gap-3 py-6'>
        {emergencyContacts.map((contact, index) => (
          <div
            className='w-full flex flex-col p-3 rounded-xl bg-secondary gap-6'
            key={contact.id}
          >
            <div className='w-full flex justify-between items-center gap-3 relative'>
              <div className='flex items-center gap-2'>
                <HeartIcon className='w-4 h-4' />
                <p className='font-bold'>{`Contact #${index + 1}`}</p>
              </div>
              <div className='flex items-center gap-1'>
                <EditEmergencyContactDialog
                  contact={contact}
                />
                <DeleteEmergencyContactDialog
                  id={contact.id}
                />
              </div>
            </div>
            <div className='w-full flex flex-wrap gap-2'>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <SquareUserRoundIcon className='w-4 h-4' />
                  <p className='font-bold'>Name:</p>
                </div>
                <InfoBadge
                  className='bg-background hover:bg-background/80'
                >
                  {contact.name}
                </InfoBadge>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <PhoneCallIcon className='w-4 h-4' />
                  <p className='font-bold'>Phone:</p>
                </div>
                <InfoBadge
                  className='bg-background hover:bg-background/80'
                >
                  {contact.phone}
                </InfoBadge>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <MapPinIcon className='w-4 h-4' />
                  <p className='font-bold'>Address:</p>
                </div>
                <InfoBadge
                  className='bg-background hover:bg-background/80'
                >
                  {contact.address}
                </InfoBadge>
              </div>
            </div>
          </div>
        ))}
        {emergencyContacts.length < 2 && (
          <div className='w-full h-full flex items-center justify-center'>
            <NewEmergencyContactsDialog idEmployee={idEmployee} />
          </div>
        )}
        <p className='col-span-1 xl:col-span-2 text-center text-xs'>
          All Emergency Contacts
        </p>
      </div>
    </DashboardCardWrapper>
  )
}
