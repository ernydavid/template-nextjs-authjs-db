'use client'

import { AlertCircleIcon, CalendarIcon, CheckCircleIcon, FileBadge, FileBadgeIcon, PlusIcon, SettingsIcon, User2Icon } from 'lucide-react'
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
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'
import { newEmployeeContract } from '@/actions/contracts'

interface AssignContractsDialogProps {
  employees: any
}

function BannerContractCount ({ employees }: {employees: any}) {
  if (employees.length !== 0) {
    return (
      <div className='w-full flex flex-col justify-center xl:justify-between gap-4 tracking-tight text-sm rounded-lg p-3 bg-background'>
        <div className='flex items-center gap-2'>
          <FileBadgeIcon className='w-5 h-5' />
          <p className='text-lg font-bold'>Employee Contracts</p>
        </div>
        <div className='w-full flex flex-col items-center justify-center gap-2 tracking-tight'>
          <AlertCircleIcon className='w-5 h-5 text-orange-500' />
          <p className='text-orange-500 text-sm text-center'>{`There are ${employees.length} employees in the database without contracts. Please add missing contracts.`}</p>
        </div>
      </div>
    )
  }
}

export function AssignContractsDialog ({ employees }: AssignContractsDialogProps) {
  const [error, setError] = useState<string | null>()
  const [success, setSuccess] = useState<string | null>()
  const [open, setOpen] = useState(false)
  const [isPending, starTransition] = useTransition()

  const form = useForm<z.infer<typeof EmployeeContractsSchema>>({
    resolver: zodResolver(EmployeeContractsSchema),
    defaultValues: {
      idEmployee: '' || undefined,
      hireDate: undefined,
      salary: '',
      contractEndDate: undefined,
      contractType: 'fixed-term'
    }
  })

  if (employees.length === 0) {
    return (
      <div className='w-full flex flex-col justify-between gap-4 tracking-tight text-sm rounded-lg p-3 bg-background'>
        <div className='flex items-center gap-2'>
          <FileBadgeIcon className='w-5 h-5' />
          <p className='text-lg font-bold'>Employee Contracts</p>
        </div>
        <div className='flex flex-col gap-2 items-center justify-center bg-background rounded-lg p-3'>
          <CheckCircleIcon className='w-5 h-5 text-emerald-500' />
          <p className='font-semibold tracking-tight text-emerald-500 text-sm'>All contract employees are up to date!</p>
        </div>
        <div className='flex justify-center'>
          <Button
            size='sm'
            variant='ghost'
            className='rounded-full flex items-center gap-2'
          >
            <SettingsIcon className='w-3 h-3' />
            <span>Manage contracts</span>
          </Button>
        </div>
      </div>
    )
  }

  const onSubmit = async (values: z.infer<typeof EmployeeContractsSchema>) => {
    setError('')
    setSuccess('')

    starTransition(() => {
      newEmployeeContract({
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
    <div className='w-full flex flex-col justify-center xl:justify-between gap-4 tracking-tight text-sm rounded-lg p-3 bg-background'>
      <BannerContractCount employees={employees} />
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger
          asChild
        >
          <Button
            className='flex justify-center items-center gap-2 rounded-full'
            size='sm'
          >
            <PlusIcon className='w-5 h-5' />
            <span>Add Contracts</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='md:max-w-[600px] h-full md:h-auto overflow-y-auto md:overflow-hidden'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <FileBadgeIcon className='w-5 h-5' />
              Contract Information
            </DialogTitle>
            <DialogDescription>
              Add contracts information to every employee active on portal, to manage payments and contracts status.
            </DialogDescription>
          </DialogHeader>

          <div>
            <Form {...form}>
              <form
                className='grid grid-cols-1 md:grid-cols-2 gap-3 p-3 overflow-y-auto scrollbar-hide'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name='idEmployee'
                  render={({ field }) => (
                    <FormItem className='col-span-1 md:col-span-2'>
                      <FormLabel>Employees</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a Employee' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employees?.map((employee: any, index: number) => (
                            <SelectItem
                              value={employee.id}
                              key={employee.id}
                            >
                              <div className='flex items-center gap-3'>
                                <User2Icon className='w-4 h-4' />
                                <p>{employee.name}</p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='salary'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Quantity</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='$250'
                          type='number'
                          disabled={isPending}
                          onChange={field.onChange}
                        />
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
                              date > new Date() || date < new Date('2015-01-01')}
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
                              date > new Date() || date < new Date('2015-01-01')}
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
                            <SelectValue placeholder='Select a Employee' />
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
                    Save Contract
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>

        </DialogContent>
      </Dialog>
    </div>
  )
}
