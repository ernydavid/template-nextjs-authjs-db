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

import { UserCog2Icon } from 'lucide-react'
import { EditPositionDialog } from './edit-position-dialog'
import { DeletePositionDialog } from './delete-position-dialog'

export function PositionsTable ({
  positions
}:{positions: any[]}) {
  return (
    <Table className='text-sm'>
      <TableHeader>
        <TableRow>
          <TableHead>
            Positions Name
          </TableHead>
          <TableHead className='text-center'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions.map((position) => (
          <TableRow
            key={position.id}
          >
            <TableCell className='font-medium'>
              <div className='flex items-center gap-2'>
                <div className='w-5 h-5 rounded-full overflow-hidden flex justify-center items-center bg-gradient-to-br from-primary to-sky-900'>
                  <UserCog2Icon className='w-3 h-3 text-primary-foreground' />
                </div>
                <span>{position.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex justify-center items-center gap-2'>
                <EditPositionDialog
                  id={position.id}
                  name={position.name}
                />
                <DeletePositionDialog id={position.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className='font-bold'>All Positions</TableCell>
          <TableCell className='text-center font-bold'>{positions.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
