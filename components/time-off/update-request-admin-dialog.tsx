'use client'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CalendarDaysIcon, CalendarIcon, CheckCircleIcon, ClockIcon, Edit3Icon, XCircleIcon } from 'lucide-react'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { TimeOffSchema } from '@/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'
import { addDays, format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import { cn } from '@/lib/utils'
import { updateTimeOffRequest } from '@/actions/time-off'
import { useMediaQuery } from 'react-responsive'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface UpdateTimeOffRequestDialogProps {
  id: string
  employeeId: string
  fromDate: Date
  toDate: Date,
  type: string,
  status: 'Pending' | 'Aproved' | 'Rejected' | undefined
}

export function UpdateTimeOffRequestDialog ({
  id,
  employeeId,
  fromDate,
  toDate,
  type,
  status
}: UpdateTimeOffRequestDialogProps) {
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  })

  const [error, setError] = useState<string | null>()
  const [success, setSuccess] = useState<string | null>()
  const [open, setOpen] = useState(false)
  const [isPending, starTransition] = useTransition()

  const form = useForm<z.infer<typeof TimeOffSchema>>({
    resolver: zodResolver(TimeOffSchema),
    defaultValues: {
      id,
      employeeId,
      date: {
        from: fromDate,
        to: toDate
      },
      status,
      type
    }
  })

  const onSubmit = async (values: z.infer<typeof TimeOffSchema>) => {
    setError('')
    setSuccess('')

    starTransition(() => {
      updateTimeOffRequest({
        ...values
      }).then((res) => {
        if (res.error) {
          setError(res.error)
        }
        if (res.success) {
          toast.success(res.success)
          setOpen(false)
          form.reset()
        }
      })
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        asChild
      >
        <Button
          className='flex items-center gap-2 rounded-full h-8'
          size='sm'
          variant='outline'
        >
          <Edit3Icon className='w-4 h-4' />
          <span>Change Status</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='md:max-w-[600px] h-full md:h-auto overflow-y-auto md:overflow-hidden'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <CalendarDaysIcon className='w-5 h-5' />
            Time-off Request
          </DialogTitle>
          <DialogDescription>
            Aproved or reject time-off request of employees.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form
              className='grid grid-cols-1 md:grid-cols-2 gap-3 p-3 overflow-y-auto scrollbar-hide'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className='hidden'>
                <FormField
                  name='id'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type='hidden'
                          value={id}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='hidden'>
                <FormField
                  name='employeeId'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type='hidden'
                          value={employeeId}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem className='col-span-1 md:col-span-2 w-full flex flex-col'>
                    <FormLabel>Time-off request period</FormLabel>
                    <Popover>
                      <PopoverTrigger
                        className='w-full'
                        asChild
                      >
                        <Button
                          id='date'
                          variant='outline'
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value.from && 'text-muted-foreground'
                          )}
                          disabled
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {field.value.from
                            ? (
                                field.value.to
                                  ? (
                                    <>
                                      {format(field.value.from, 'PPP')} -{' '}
                                      {format(field.value.to, 'PPP')}
                                    </>
                                    )
                                  : (
                                      format(field.value.from, 'PPP')
                                    )
                              )
                            : (
                              <span>Pick a time-off date</span>
                              )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className='w-full p-0'
                        align='start'
                      >
                        <Calendar
                          className='w-full'
                          disableNavigation
                          initialFocus
                          mode='range'
                          defaultMonth={field.value.from}
                          selected={{ from: field.value.from!, to: field.value.to }}
                          onSelect={field.onChange}
                          numberOfMonths={isMobile ? 1 : 2}
                          disabled={(value) => value < addDays(new Date(), +30)}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The date of employee time-off request.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='col-span-1 md:col-span-2'>
                <FormField
                  name='type'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time-off Type</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          readOnly
                          placeholder='Vacation, Sick leave, etc..'
                          value={field.value}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change Status</FormLabel>
                    <Select
                      disabled={isPending}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          value='Pending'
                        >
                          <div className='flex items-center gap-2 text-orange-400'>
                            <ClockIcon className='w-4 h-4' />
                            <p>Pending</p>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value='Aproved'
                        >
                          <div className='flex items-center gap-2 text-emerald-500'>
                            <CheckCircleIcon className='w-4 h-4' />
                            <p>Aproved</p>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value='Rejected'
                        >
                          <div className='flex items-center gap-2 text-destructive'>
                            <XCircleIcon className='w-4 h-4' />
                            <p>Rejected</p>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {(error || success) && (
                <div className='col-span-1 md:col-span-2'>
                  {success && <FormSuccess message={success} />}
                  {error && <FormError message={error} />}
                </div>
              )}
              <DialogFooter className='py-2 w-full col-span-1 md:col-span-2 flex items-center gap-3'>
                <DialogClose>Cancel</DialogClose>
                <Button
                  type='submit'
                  className='flex'
                  disabled={isPending}
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>

      </DialogContent>
    </Dialog>
  )
}
