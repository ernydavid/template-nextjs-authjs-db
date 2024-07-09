import { getAllTimeOffRequest, getTimeOffRequestById, getAllTimeOffRequestByStatus } from '@/actions/time-off'
import { DashboardCardWrapper } from '@/components/dashboard-card-wrapper'
import { InfoBadge } from '@/components/info-badge'
import { NewTimeOffRequestDialog } from '@/components/time-off/new-request-dialog'
import { UpdateTimeOffRequestDialog } from '@/components/time-off/update-request-admin-dialog'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { currentRole, currentUser } from '@/lib/auth'
import { cn, formattedName, shortestId } from '@/lib/utils'
import { format } from 'date-fns'
import { AlertCircleIcon, BellIcon, CalendarDaysIcon } from 'lucide-react'
import Link from 'next/link'

export default async function TimeOffPage () {
  const user = await currentUser()
  const role = await currentRole()

  if (!user) {
    return (
      <div className='w-full h-full pt-3 md:pt-3 p-3 tracking-tight gap-3 flex flex-col items-center justify-center'>
        <p>Employee not Found!</p>
      </div>
    )
  }

  const allRequestByEmployee = await getTimeOffRequestById(user.id)
  const allEmployeesRequest = await getAllTimeOffRequest()
  const allPendingRequest = await getAllTimeOffRequestByStatus('Pending')

  return (
    <div className='w-full h-full pt-3 md:pt-3 flex flex-col p-3 tracking-tight gap-3'>
      <DashboardCardWrapper
        iconTitle={<CalendarDaysIcon className='w-5 h-5' />}
        title='Time Off'
        actions={
          <div className='flex items-center gap-3'>
            <NewTimeOffRequestDialog employeeId={user.id} />
            {(role === 'admin' || role === 'management') && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size='icon'
                    variant='outline'
                    className='rounded-full relative'
                  >
                    <BellIcon className='w-4 h-4' />
                    {allPendingRequest.length !== 0 &&
                      <div className='w-3 h-3 absolute top-0 right-0 bg-emerald-500 rounded-full -translate-y-1 flex-1' />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className='w-[300px] h-full overflow-y-auto scrollbar-hide'
                  align='end'
                >
                  {allPendingRequest.map((item) => (
                    <DropdownMenuItem
                      key={item.employeeTimeOff.id}
                      asChild
                      className='w-full h-full'
                    >
                      <Link
                        href='/dashboard/time-off'
                      >
                        <div className='w-full flex gap-2 p-2'>
                          <div className='w-5 h-5 rounded-full bg-gradient-to-br from-primary to-sky-800 flex items-center justify-center font-bold gap-2 text-primary-foreground flex-shrink-0'>
                            <BellIcon className='w-3 h-3' />
                          </div>
                          <div className='flex flex-col tracking-tight leading-tight text-sm text-foreground'>
                            <p className='font-semibold'>{`${item.user?.name}: Request Time-off`}</p>
                            <p className='text-muted-foreground text-sm'>{`Request ${shortestId(item.employeeTimeOff.id)}, ${item.employeeTimeOff.type?.split(' ', 2).join(',').replace(',', ' ')}...`}</p>
                            <p>{`${format(new Date(item.employeeTimeOff?.startDate as Date), 'PP')}-${format(new Date(item.employeeTimeOff?.endDate as Date), 'PP')}`}</p>
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        }
      >
        <div className='w-full flex flex-col gap-6 tracking-tight py-3'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2 justify-between'>
              <p className='font-semibold'>My Requests</p>
            </div>
            {allRequestByEmployee.length !== 0
              ? (
                <div>
                  <Table className='w-full'>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[120px] hidden xl:table-cell'>Request ID</TableHead>
                        <TableHead className=''>Request by</TableHead>
                        <TableHead className='min-w-[150px]'>Time-off period</TableHead>
                        <TableHead className='w-[120px]'>Type</TableHead>
                        <TableHead className='w-[100px]'>Status</TableHead>
                        <TableHead className='hidden xl:table-cell'>Created</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allRequestByEmployee.map((item) => (
                        <TableRow
                          key={item.id}
                        >
                          <TableCell className='w-[120px] hidden xl:table-cell'>{'...' + item.id.slice(29)}</TableCell>
                          <TableCell className=''>
                            <div className='flex items-center gap-2'>
                              <div className='w-8 h-8 rounded-full bg-gradient-to-br from-primary to-sky-800 flex items-center justify-center text-primary-foreground'>
                                <p>{formattedName(user.name)}</p>
                              </div>
                              <div className='flex flex-col'>
                                <p className='font-semibold'>{user.name}</p>
                                <p className='text-sm'>{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className='min-w-[150px]'>{`${format(new Date(item.startDate as Date), 'PPP')} - ${format(new Date(item.endDate as Date), 'PPP')}`}</TableCell>
                          <TableCell className='w-[120px]'>
                            {item.type}
                          </TableCell>
                          <TableCell className='w-[100px]'>
                            <InfoBadge
                              className={cn(
                                item.status === 'Pending' && 'bg-orange-400 hover:bg-orange-400/80 text-primary-foreground',
                                item.status === 'Aproved' && 'bg-emerald-500 hover:bg-emerald-500/80 text-primary-foreground',
                                item.status === 'Rejected' && 'bg-destructive hover:bg-destructive/80 text-primary-foreground'
                              )}
                            >
                              {item.status}
                            </InfoBadge>
                          </TableCell>
                          <TableCell className='hidden xl:table-cell'>{format(new Date(item.created as Date), 'PPP')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                )
              : (
                <div className='w-full flex flex-col items-center justify-center gap-2'>
                  <div className='flex items-center gap-2'>
                    <AlertCircleIcon className='text-orange-400 w-5 h-5' />
                    <p className='text-orange-400'>You have not time-off request</p>
                  </div>
                  <NewTimeOffRequestDialog employeeId={user.id} />
                </div>
                )}
          </div>

          {(role === 'admin' || role === 'management' || role === 'manager') && allEmployeesRequest.length !== 0 && (
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2 justify-between'>
                <p className='font-semibold'>All Requests</p>
              </div>
              <Table className='w-full'>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[120px] hidden xl:table-cell'>Request ID</TableHead>
                    <TableHead className='w-[120px]'>Request by</TableHead>
                    <TableHead className='min-w-[150px]'>Time-off period</TableHead>
                    <TableHead className='w-[120px]'>Type</TableHead>
                    <TableHead className='w-[80px]'>Status</TableHead>
                    <TableHead className='hidden xl:table-cell'>Created</TableHead>
                    <TableHead className='w-[100px]'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allEmployeesRequest.map((item) => (
                    <TableRow
                      key={item.employeeTimeOff.id}
                    >
                      <TableCell className='w-[120px] hidden xl:table-cell'>{'...' + item.employeeTimeOff.id.slice(29)}</TableCell>
                      <TableCell className='w-[120px]'>
                        <div className='flex items-center gap-2'>
                          <div className='w-8 h-8 rounded-full bg-gradient-to-br from-primary to-sky-800 flex items-center justify-center text-primary-foreground flex-shrink-0'>
                            <p>{item.user?.name?.includes(' ') ? item.user?.name?.split(' ').map((word) => (word.charAt(0))).join('').toUpperCase() : item.user?.name?.slice(0, 2).toUpperCase()}</p>
                          </div>
                          <div className='flex flex-col'>
                            <p className='font-semibold'>{item?.user?.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className='min-w-[150px]'>{`${format(new Date(item.employeeTimeOff.startDate as Date), 'PPP')} - ${format(new Date(item.employeeTimeOff.endDate as Date), 'PPP')}`}</TableCell>
                      <TableCell className='w-[120px]'>{item.employeeTimeOff.type}</TableCell>
                      <TableCell className='w-[80px]'>
                        <InfoBadge
                          className={cn(
                            item.employeeTimeOff.status === 'Pending' && 'bg-orange-400 hover:bg-orange-400/80 text-primary-foreground',
                            item.employeeTimeOff.status === 'Aproved' && 'bg-emerald-500 hover:bg-emerald-500/80 text-primary-foreground',
                            item.employeeTimeOff.status === 'Rejected' && 'bg-destructive hover:bg-destructive/80 text-primary-foreground'
                          )}
                        >
                          {item.employeeTimeOff.status}
                        </InfoBadge>
                      </TableCell>
                      <TableCell className='hidden xl:table-cell'>{format(new Date(item.employeeTimeOff.created as Date), 'PPP')}</TableCell>
                      <TableCell className='w-[100px]'>
                        <UpdateTimeOffRequestDialog
                          key={`update-${item.employeeTimeOff.id}`}
                          id={item.employeeTimeOff.id}
                          employeeId={item.employeeTimeOff.employeeId as string}
                          fromDate={item.employeeTimeOff.startDate as Date}
                          toDate={item.employeeTimeOff.endDate as Date}
                          status={item.employeeTimeOff.status}
                          type={item.employeeTimeOff.type as string}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </DashboardCardWrapper>
    </div>
  )
}
