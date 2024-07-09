'use client'

import { UserType } from '@/db/schema/users'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import Link from 'next/link'
import { AlertOctagonIcon, EditIcon, NetworkIcon, SendHorizonalIcon, UserCog2Icon } from 'lucide-react'
import { useCurrentRole } from '@/hooks/use-current-role'
import { Button } from '@/components/ui/button'
import { EmployeePositionTableType } from '@/db/schema/employee'

export function EmployeeCardInfo ({ employee, employeeJobInfo }: {
  employee: UserType
  employeeJobInfo: EmployeePositionTableType[]
}) {
  const role = useCurrentRole()
  const shortName = employee?.name?.includes(' ')
    ? employee.name?.split(' ')[0].charAt(0) + employee.name?.split(' ')[1].charAt(0)
    : employee.name?.slice(0, 3).toUpperCase()

  return (
    <Card className='w-full p-3 flex flex-col lg:flex-row justify-center items-center lg:items-start lg:justify-start shadow-none border-none text-foreground'>
      <CardHeader>
        <div className='w-28 h-28 rounded-full overflow-hidden'>
          <div className='w-28 h-28 rounded-full bg-gradient-to-br from-primary to-sky-500 flex justify-center items-center'>
            <p className='text-3xl font-semibold text-primary-foreground'>{shortName}</p>
          </div>
        </div>
      </CardHeader>
      <div className='flex flex-col gap-4'>
        <CardContent className='text-sm'>
          <div className='flex flex-col gap-2 text-center md:text-left'>
            <p className='text-2xl font-bold py-2'>{employee.name}</p>
            <div className='flex items-center gap-2'>
              <p className='font-bold'>Email:</p>
              <p>{employee.email}</p>
            </div>
            {(role === 'admin' || role === 'management') &&
              <div className='flex items-center gap-2'>
                <p className='font-bold'>2FA:</p>
                <p>{employee.isTwoFactorEnabled ? 'Enabled' : 'Disabled'}</p>
              </div>}
          </div>
          <div className='flex flex-col gap-4 py-4 tracking-tight'>
            <div className='flex items-center gap-6'>
              <p className='font-bold tracking-tight text-nowrap'>Occupation Information</p>
              <p className='text-muted-foreground text-xs text-nowrap'>(Not-editable)</p>
            </div>
            <div className='grid md:grid-cols-1 grid-cols-2 gap-3'>
              {employeeJobInfo.length !== 0 && employeeJobInfo.map((item, index) => (
                <div
                  className='w-full grid grid-cols-1 lg:grid-cols-3 gap-4 px-2 py-4 rounded-xl border border-primary/10'
                  key={index}
                >
                  <div className='lg:col-span-3'>
                    <p className='text-base font-bold tracking-tight'>{`Role #${index + 1}`}</p>
                  </div>
                  <div className='flex items-center gap-2 leading-tight'>
                    <div className='flex justify-center items-center w-9 h-9 rounded-full overflow-hidden bg-primary flex-shrink-0'>
                      <UserCog2Icon className='w-5 h-5 text-primary-foreground' />
                    </div>
                    <p className='font-bold tracking-tight'>{item.position}</p>
                  </div>
                  <div className='flex items-center gap-2 leading-tight'>
                    <div className='flex justify-center items-center w-9 h-9 rounded-full overflow-hidden bg-primary flex-shrink-0'>
                      <NetworkIcon className='w-5 h-5 text-primary-foreground' />
                    </div>
                    <p className='font-bold tracking-tight'>{item.department}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-9 h-9 rounded-full overflow-hidden flex justify-center items-center flex-shrink-0'>
                      <img
                        className='h-full object-cover object-center'
                        src={`https://flagcdn.com/${item.iso2Name && item.iso2Name.toLowerCase()}.svg`}
                        alt={`${item.country} flag`}
                      />
                    </div>
                    <div className='flex flex-col leading-tight'>
                      <p className='font-bold tracking-tight'>{item.country}</p>
                      <p>{item.iso2Name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {employeeJobInfo.length === 0 && (
              <div className='py-2 flex items-center gap-2'>
                <AlertOctagonIcon className='w-5 h-5 text-destructive' />
                <p className='text-destructive'>Positions and departments is not assigned yet!</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className='flex items-center gap-3'>
          {(role === 'admin' || role === 'management') &&
            <Button
              asChild
              className='rounded-full'
            >
              <Link
                className='flex items-center gap-2'
                href={`/dashboard/employees/${employee.id}/edit`}
              >
                <EditIcon className='w-4 h-4' />
                <span>Edit</span>
              </Link>
            </Button>}
          <Button
            asChild
            className='rounded-full'
          >
            <Link
              className='flex items-center gap-2'
              href={`/dashboard/employees/${employee.id}/edit`}
            >
              <SendHorizonalIcon className='w-4 h-4' />
              <span>Send Message</span>
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
