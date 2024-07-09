'use client'

import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableFooter,
  TableCell,
  TableRow
} from '@/components/ui/table'

import { NetworkIcon } from 'lucide-react'
import { EditDepartmentDialog } from './edit-department-dialog'
import { DeleteDepartmentDialog } from './delete-department-dialog'

export function DepartmentsTable ({
  departments
}:{departments: any[]}) {
  return (
    <Table className='text-sm'>
      <TableHeader>
        <TableRow>
          <TableHead>
            Department Name
          </TableHead>
          <TableHead className='text-center'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {departments.map((department) => (
          <TableRow
            key={department.id}
          >
            <TableCell className='font-medium'>
              <div className='flex items-center gap-2'>
                <div className='w-5 h-5 rounded-full overflow-hidden flex justify-center items-center bg-gradient-to-br from-primary to-sky-900'>
                  <NetworkIcon className='w-3 h-3 text-primary-foreground' />
                </div>
                <span>{department.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex justify-center items-center gap-2'>
                <EditDepartmentDialog
                  id={department.id}
                  name={department.name}
                />
                <DeleteDepartmentDialog id={department.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className='font-bold'>All Departments</TableCell>
          <TableCell className='text-center font-bold'>{departments.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
