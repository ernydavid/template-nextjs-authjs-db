'use client'

import { AlertCircleIcon } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { employeeContractsTableType } from '@/db/schema/employee'
import { UserType } from '@/db/schema/users'
import { shortestId } from '@/lib/utils'
import { format } from 'date-fns'
import { InfoBadge } from '../info-badge'
import { UpdateEmployeeContractsDialog } from './update-employee-contract-dialog'

interface EmployeeContractTableProps {
  employeeContract: {
    user: UserType | null
    employeeContracts: employeeContractsTableType | null
  }
}

export function EmployeeContractTable ({
  employeeContract
}: EmployeeContractTableProps) {
  if (!employeeContract || !employeeContract.user || !employeeContract.employeeContracts) {
    return (
      <div className='w-full h-full flex flex-col justify-center items-center gap-2 py-4'>
        <AlertCircleIcon className='w-8 h-8 text-orange-500' />
        <p className='text-sm font-semibold text-orange-500 text-center'>This employee has not contract!</p>
        <p className='text-muted-foreground'>Please, add one</p>
      </div>
    )
  }
  return (
    <Table className='tracking-tight text-sm'>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Hire Date</TableHead>
          <TableHead>Contract Expire</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          key={employeeContract.employeeContracts.id}
        >
          <TableCell>
            {shortestId(employeeContract.employeeContracts.id)}
          </TableCell>
          <TableCell>
            {format(new Date(employeeContract.employeeContracts.hireDate as Date), 'PPP')}
          </TableCell>
          <TableCell>
            {format(new Date(employeeContract.employeeContracts.contractEndDate as Date), 'PPP')}
          </TableCell>
          <TableCell>
            {`$ ${employeeContract.employeeContracts.salary}`}
          </TableCell>
          <TableCell>
            <InfoBadge className='w-max'>{employeeContract.employeeContracts.contractType}</InfoBadge>
          </TableCell>
          <TableCell>
            {new Date(employeeContract.employeeContracts.created as Date).toDateString()}
          </TableCell>
          <TableCell>
            {new Date(employeeContract.employeeContracts.updated as Date).toDateString()}
          </TableCell>
          <TableCell>
            <div className='w-full flex items-center gap-2'>
              <UpdateEmployeeContractsDialog
                key={`update-${employeeContract.employeeContracts.updated?.toTimeString()}`}
                id={employeeContract.employeeContracts.id}
                employeeId={employeeContract.employeeContracts.employeeId as string}
                contractEnd={employeeContract.employeeContracts.contractEndDate as Date}
                contractType={employeeContract.employeeContracts.contractType || undefined}
                hireDate={employeeContract.employeeContracts.hireDate as Date}
                salary={employeeContract.employeeContracts.salary as string}
              />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
