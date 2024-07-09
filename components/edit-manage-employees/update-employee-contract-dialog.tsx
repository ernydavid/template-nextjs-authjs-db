'use client'

import { CalendarIcon, CircleDollarSignIcon, Edit3Icon, FileBadge, FileBadgeIcon } from 'lucide-react'
import { useState, useTransition } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { EmployeeContractsSchema, contractArr } from '@/schemas'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { addMonths, format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'
import { updateEmployeeContract } from '@/actions/contracts'

interface UpdateEmployeeContractsDialogProps {
  id: string
  employeeId: string
  hireDate: Date
  contractEnd: Date
  salary: string | undefined
  contractType?: 'part-time' | 'fixed-term' | 'casual' | 'zero-hour' | 'freelance' | undefined
}

export function UpdateEmployeeContractsDialog ({
  id,
  employeeId,
  hireDate,
  contractEnd,
  salary,
  contractType
}: UpdateEmployeeContractsDialogProps) {
  const [error, setError] = useState<string | null>()
  const [success, setSuccess] = useState<string | null>()
  const [open, setOpen] = useState(false)
  const [isPending, starTransition] = useTransition()

  const form = useForm<z.infer<typeof EmployeeContractsSchema>>({
    resolver: zodResolver(EmployeeContractsSchema),
    defaultValues: {
      id,
      idEmployee: employeeId,
      hireDate,
      salary,
      contractEndDate: contractEnd,
      contractType
    }
  })

  const onSubmit = async (values: z.infer<typeof EmployeeContractsSchema>) => {
    setError('')
    setSuccess('')

    starTransition(() => {
      updateEmployeeContract({
        ...values
      }).then((res) => {
        if (res.error) {
          setError(res.error)
        }
        if (res.success) {
          form.reset()
          toast.success(res.success)
          setOpen(false)
        }
      })
    })
  }

  return (
    <Dialog
      key={`contract-${employeeId}`}
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        asChild
      >
        <Button
          className='flex h-8 justify-center items-center gap-2 rounded-full'
          size='icon'
          variant='outline'
        >
          <Edit3Icon className='w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='md:max-w-[600px] h-full md:h-auto overflow-y-auto md:overflow-hidden'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <FileBadgeIcon className='w-5 h-5' />
            Contract Information
          </DialogTitle>
          <DialogDescription>
            Update employee contract information.
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
                          disabled={isPending}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='hidden'>
                <FormField
                  name='idEmployee'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type='hidden'
                          disabled={isPending}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name='salary'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Quantity</FormLabel>
                    <FormControl>
                      <div className='flex h-max relative'>
                        <Input
                          {...field}
                          placeholder='250'
                          type='number'
                          className='pl-7'
                          disabled={isPending}
                          onChange={field.onChange}
                          value={field.value}
                        />
                        <CircleDollarSignIcon className='w-4 h-4 absolute left-2 top-[50%] translate-y-[-50%]' />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='hireDate'
                render={({ field }) => (
                  <FormItem className='w-full flex flex-col gap-2'>
                    <FormLabel>Hire Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? (
                                  format(field.value, 'PPP')
                                )
                              : (
                                <span>Pick a date</span>
                                )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          classNames={{
                            caption_dropdowns: 'flex flex-col items-center text-center gap-2',
                            dropdown: 'bg-secondary py-2 px-4 font-semibold text-sm rounded-full',
                            caption_label: 'hidden'
                          }}
                          className='w-full'
                          mode='single'
                          fromYear={2015}
                          toYear={new Date().getFullYear()}
                          captionLayout='dropdown'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > addMonths(new Date(), +12) || date < new Date('2015-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='contractEndDate'
                render={({ field }) => (
                  <FormItem className='w-full flex flex-col gap-2'>
                    <FormLabel>Contract end date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? (
                                  format(field.value, 'PPP')
                                )
                              : (
                                <span>Pick a date</span>
                                )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          classNames={{
                            caption_dropdowns: 'flex flex-col items-center text-center gap-2',
                            dropdown: 'bg-secondary py-2 px-4 font-semibold text-sm rounded-full',
                            caption_label: 'hidden'
                          }}
                          className='w-full'
                          mode='single'
                          fromYear={2015}
                          toYear={2099}
                          captionLayout='dropdown'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='contractType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract Type</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a Type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {contractArr.map((item, index) => (
                          <SelectItem
                            value={item}
                            key={index}
                          >
                            <div className='flex items-center gap-3'>
                              <FileBadge className='w-4 h-4' />
                              <p>{item}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {(error || success) &&
                <div className='w-full flex flex-col col-span-1 md:col-span-2'>
                  {success && <FormSuccess message={success} />}
                  {error && <FormError message={error} />}
                </div>}
              <DialogFooter className='py-2 w-full col-span-1 md:col-span-2 flex items-center gap-3'>
                <DialogClose>Cancel</DialogClose>
                <Button
                  type='submit'
                  className='flex'
                  disabled={isPending}
                >
                  Update Contract
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
