import { getEmployeeJobInfoById, getEmployeePersonalInfo } from '@/actions/employee'
import { EmployeeProfileCard } from '@/components/employees/employee-profile-card'
import { getUserById } from '@/data/user'
import { FrownIcon } from 'lucide-react'
import Link from 'next/link'

export default async function ViewEmployeePage ({ params }: {
  params: {
    id: string
  }
}) {
  const id = params.id
  const employee = await getUserById(id)
  const job = await getEmployeeJobInfoById(id)
  const personal = await getEmployeePersonalInfo(id)

  if (!employee || !job) {
    return (
      <div className='w-full h-full flex flex-col justify-center items-center gap-2 py-4'>
        <FrownIcon className='w-5 h-5' />
        <p className='text-lg text-destructive'>Oppss... Something went wrong!</p>
        <p className='text-muted-foreground'>Employee not found</p>
        <Link
          href='/dashboard/employees'
        >
          Go back
        </Link>
      </div>
    )
  }

  return (
    <div className='w-full h-full p-3'>
      <EmployeeProfileCard
        employee={employee}
        employeeJobInfo={job}
        employeePersonalInfo={personal}
      />
    </div>
  )
}
