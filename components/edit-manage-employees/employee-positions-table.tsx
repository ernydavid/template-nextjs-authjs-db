'use client'

import { AlertCircleIcon, NetworkIcon, SquareUserRoundIcon } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DepartmentsType, EmployeePositionsTableType, PositionType } from '@/db/schema/employee'
import { CountriesType } from '@/db/schema/countries'
import { UpdateEmployeePositionDialog } from './update-employee-position-dialog'
import { DeleteEmployeePositionDialog } from './delete-employee-position-dialog'

interface EmployeePositionsTableProps {
  employeeData: EmployeePositionsTableType[]
  allCountries: CountriesType[]
  allPositions: PositionType[]
  allDepartments: DepartmentsType[]
}

export function EmployeePositionsTable ({
  employeeData,
  allCountries,
  allPositions,
  allDepartments
}: EmployeePositionsTableProps) {
  if (employeeData.length === 0) {
    return (
      <div className='w-full h-full flex flex-col justify-center items-center gap-2 py-4'>
        <AlertCircleIcon className='w-8 h-8 text-orange-500' />
        <p className='text-sm font-semibold text-orange-500 text-center'>This employee is not assigned any department or job position.</p>
        <p className='text-muted-foreground'>Please, assign one</p>
      </div>
    )
  }
  return (
    <Table className='tracking-tight'>
      <TableHeader>
        <TableRow>
          <TableHead>Department</TableHead>
          <TableHead>Job</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employeeData.map((item) => (
          <TableRow
            key={item.id}
          >
            <TableCell>
              <div className='flex items-center gap-2'>
                <div className='w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary to-sky-900 flex items-center justify-center text-primary-foreground'>
                  <NetworkIcon className='w-4 h-4' />
                </div>
                <p className='text-sm font-semibold'>{item.department}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <div className='w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary to-sky-900 flex items-center justify-center text-primary-foreground'>
                  <SquareUserRoundIcon className='w-4 h-4' />
                </div>
                <p className='text-sm font-semibold'>{item.position}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <div className='w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary to-sky-900 flex items-center justify-center text-primary-foreground'>
                  <img
                    className='h-6 object-cover object-center'
                    src={`https://flagcdn.com/${item.iso2Name && item.iso2Name.toLowerCase()}.svg`} alt={item.country as string}
                  />
                </div>
                <p className='text-sm font-semibold'>{item.country}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className='w-full flex items-center gap-2'>
                <UpdateEmployeePositionDialog
                  id={item.id}
                  employeeId={item.idEmployee as string}
                  allCountries={allCountries}
                  allDepartments={allDepartments}
                  allPositions={allPositions}
                  defaultCountry={item.country as string}
                  defaultDepartment={item.department as string}
                  defaultPosition={item.position as string}
                />
                <DeleteEmployeePositionDialog
                  id={item.id}
                  employeeId={item.idEmployee as string}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
