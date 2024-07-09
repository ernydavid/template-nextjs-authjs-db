import { getEmergencyContactsByIdEmployee } from '@/actions/emergency'
import { getEmployeePersonalInfo } from '@/actions/employee'
import { BasicSettingsForm } from '@/components/settings/basic-settings-form'
import { EmergencyContactsPanel } from '@/components/settings/emergency-panel'
import { PersonalInformationPanel } from '@/components/settings/personal-information-panel'
import { currentUser } from '@/lib/auth'
import { User2Icon } from 'lucide-react'

export default async function SettingsPage () {
  const user = await currentUser()

  if (!user) {
    return { error: 'User Not Found!' }
  }

  const allContacts = await getEmergencyContactsByIdEmployee(user.id)
  const personalEmployeeInfo = await getEmployeePersonalInfo(user.id)

  return (
    <div className='w-full h-full p-3 tracking-tight overflow-y-auto space-y-3 scrollbar-hide'>
      <div className='flex items-center gap-2'>
        <User2Icon className='w-5 h-5' />
        <p className='text-2xl font-bold'>My Account Settings</p>
      </div>
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 overflow-y-auto gap-3'>
        <BasicSettingsForm user={user} />
        <PersonalInformationPanel
          idEmployee={user.id}
          employeeInfo={personalEmployeeInfo}
        />
        <EmergencyContactsPanel
          idEmployee={user.id}
          emergencyContacts={allContacts}
        />
      </div>
    </div>
  )
}
