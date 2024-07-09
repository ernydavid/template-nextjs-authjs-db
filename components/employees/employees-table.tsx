'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
  TableHead,
  TableFooter,
  TableCell,
  TableRow
} from '@/components/ui/table'
import { UserType } from '@/db/schema/users'
import { AtSignIcon, MailIcon, SearchIcon, UserCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

interface EmployeesTableProps {
  allEmployees: UserType[]
}

export function EmployeesTable ({
  allEmployees
}: EmployeesTableProps) {
  const router = useRouter()

  const handleClick = (id: string) => {
    router.push(`/dashboard/employees/${id}`)
  }

  return (
    <Table className='text-sm'>
      <TableCaption>All colleagues</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className='flex items-center gap-2'>
              <UserCircleIcon className='w-4 h-4' />
              <span>Name</span>
            </div>
          </TableHead>
          <TableHead className='hidden md:table-cell'>
            <div className='flex items-center gap-2'>
              <AtSignIcon className='w-4 h-4' />
              <span>Email</span>
            </div>
          </TableHead>
          <TableHead className='text-center'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allEmployees.map((employee) => (
          <TableRow
            key={employee.id}
          >
            <TableCell className='font-medium'>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 flex-shrink-0 rounded-full bg-gradient-to-br from-primary to-sky-500' />
                <span>{employee.name}</span>
              </div>
            </TableCell>
            <TableCell className='hidden md:table-cell'>{employee.email}</TableCell>
            <TableCell>
              <div className='flex justify-center items-center gap-2'>
                <Button
                  className='rounded-full'
                  size='icon'
                  onClick={() => handleClick(employee.id)}
                >
                  <SearchIcon className='w-4 h-4' />
                </Button>
                <Button
                  className='rounded-full'
                  size='icon'
                  onClick={() => {}}
                >
                  <MailIcon className='w-4 h-4' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total Employees</TableCell>
          <TableCell className='hidden lg:table-cell' />
          <TableCell className='text-right font-bold'>{allEmployees.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
