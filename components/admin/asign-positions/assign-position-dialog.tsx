'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState, useTransition } from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { EmployeePositionsSchema } from '@/schemas'

import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { AlertCircleIcon, CheckCircleIcon, NetworkIcon, PlusCircleIcon, PlusIcon, SettingsIcon, User2Icon, UserCog2Icon } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { DepartmentsType, PositionType } from '@/db/schema/employee'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { assignEmployeePosition } from '@/actions/employee'
import { toast } from 'sonner'
import { CountriesType } from '@/db/schema/countries'

interface NewAssignPositionDialogProps {
  employees: any,
  positions: PositionType[]
  departments: DepartmentsType[]
  countries: CountriesType[]
}

function BannerPositionCount ({ employees }: {employees: any}) {
  if (employees.length !== 0) {
    return (
      <div className='w-full flex flex-col items-center justify-center gap-2 tracking-tight'>
        <AlertCircleIcon className='w-5 h-5 text-orange-500' />
        <p className='text-orange-500 text-sm text-center'>{`There are ${employees.length} employees in the database without assigned departments or positions.`}</p>
      </div>
    )
  }
}

export function AssignPositionDialog ({
  employees,
  positions,
  departments,
  countries
}: NewAssignPositionDialogProps) {
  const [error, setError] = useState<string | undefined>('')
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof EmployeePositionsSchema>>({
    resolver: zodResolver(EmployeePositionsSchema),
    defaultValues: {
      idEmployee: '' || undefined
    }
  })

  const onSubmit = async (values: z.infer<typeof EmployeePositionsSchema>) => {
    setError('')

    startTransition(() => {
      assignEmployeePosition(values).then((res) => {
        if (res.error) {
          setError(res.error)
        }
        if (res.success) {
          setOpen(false)
          toast.success(res.success)
          form.reset()
        }
      })
    })
  }

  if (employees.length === 0) {
    return (
      <div className='flex flex-col gap-4 justify-center xl:justify-between bg-background rounded-lg p-3'>
        <div className='flex items-center gap-2'>
          <UserCog2Icon className='w-5 h-5' />
          <p className='text-lg font-bold'>Employee Positions</p>
        </div>
        <div className='flex flex-col gap-2 items-center justify-center bg-background rounded-lg p-3'>
          <CheckCircleIcon className='w-5 h-5 text-emerald-500' />
          <p className='font-semibold tracking-tight text-emerald-500 text-sm text-center'>All Employees have assigned positions correctly!</p>
        </div>
        <div className='flex justify-center'>
          <Button
            size='sm'
            variant='ghost'
            className='rounded-full flex items-center gap-2'
          >
            <SettingsIcon className='w-3 h-3' />
            <span>Manage departments & positions</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 justify-center xl:justify-between bg-background rounded-lg p-3'>
      <div className='flex items-center gap-2'>
        <UserCog2Icon className='w-5 h-5' />
        <p className='text-lg font-bold'>Employee Positions</p>
      </div>
      <BannerPositionCount employees={employees} />
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger
          asChild
        >
          <Button
            className='flex items-center gap-2 rounded-full'
            size='sm'
          >
            <PlusIcon className='w-5 h-5' />
            <span>Assign Employee Departments & Positions</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='md:max-w-[450px] h-full md:h-auto overflow-y-auto md:overflow-hidden'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <PlusCircleIcon className='w-5 h-5' />
              Assign Departments & Positions
            </DialogTitle>
            <DialogDescription>
              Assign diferent positions and departments to all employees.
            </DialogDescription>
          </DialogHeader>

          <div>
            <Form {...form}>
              <form
                className='grid gap-3 py-3'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name='idEmployee'
                  render={({ field }) => (
                    <FormItem>
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
                          {employees.map((employee: any) => (
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
                  control={form.control}
                  name='country'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Countries</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Assign Country' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem
                              value={country.name ? country.name : 'Not Assigned'}
                              key={country.id}
                            >
                              <div className='flex items-center gap-3'>
                                <div className='w-5 h-5 rounded-full overflow-hidden flex justify-center items-center'>
                                  <img
                                    className='h-full object-cover object-center'
                                    src={`https://flagcdn.com/${country.iso2Name && country.iso2Name.toLowerCase()}.svg`}
                                    alt={`${country.name} flag`}
                                  />
                                </div>
                                <p>{country.name}</p>
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
                  control={form.control}
                  name='department'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departments</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Assign a Department' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((department) => (
                            <SelectItem
                              value={department.name ? department.name : 'Not Assigned'}
                              key={department.id}
                            >
                              <div className='flex items-center gap-3'>
                                <NetworkIcon className='w-4 h-4' />
                                <p>{department.name}</p>
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
                  control={form.control}
                  name='position'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Positions</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Assign Job Position' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {positions.map((position) => (
                            <SelectItem
                              value={position.name ? position.name : 'Not Assigned'}
                              key={position.id}
                            >
                              <div className='flex items-center gap-3'>
                                <UserCog2Icon className='w-4 h-4' />
                                <p>{position.name}</p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && <FormError message={error} />}
                <DialogFooter className='flex items-center gap-3 py-2'>
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
    </div>
  )
}
