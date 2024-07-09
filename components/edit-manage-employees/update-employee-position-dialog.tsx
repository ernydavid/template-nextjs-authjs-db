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
import { Edit3Icon, NetworkIcon, PlusCircleIcon, UserCog2Icon } from 'lucide-react'
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
import { CountriesType } from '@/db/schema/countries'
import { DepartmentsType, PositionType } from '@/db/schema/employee'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { updateEmployeePosition } from '@/actions/employee'

interface UpdateEmployeePositionDialogProps {
  id: number
  employeeId: string
  allCountries: CountriesType[]
  allDepartments: DepartmentsType[]
  allPositions: PositionType[]
  defaultCountry: string
  defaultDepartment: string
  defaultPosition: string
}

export function UpdateEmployeePositionDialog ({
  id,
  employeeId,
  allCountries,
  allDepartments,
  allPositions,
  defaultCountry,
  defaultDepartment,
  defaultPosition
}: UpdateEmployeePositionDialogProps) {
  const [error, setError] = useState<string | undefined>('')
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof EmployeePositionsSchema>>({
    resolver: zodResolver(EmployeePositionsSchema),
    defaultValues: {
      id,
      idEmployee: employeeId,
      country: defaultCountry || undefined,
      department: defaultDepartment || undefined,
      position: defaultPosition || undefined
    }
  })

  const onSubmit = async (values: z.infer<typeof EmployeePositionsSchema>) => {
    setError('')

    startTransition(() => {
      updateEmployeePosition(values).then((res) => {
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

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='flex items-center gap-2 h-8 rounded-full'
        >
          <Edit3Icon className='w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='md:max-w-[450px] h-full md:h-auto overflow-y-auto md:overflow-hidden'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <PlusCircleIcon className='w-5 h-5' />
            Update Employee Department & Position
          </DialogTitle>
          <DialogDescription>
            Update employee with diferent position and department.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              className='grid gap-3 py-3'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name='id'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Input
                      {...field}
                      type='hidden'
                      defaultValue={field.value}
                      value={field.value}
                      disabled={isPending}
                    />
                  </FormItem>
                )}
              />
              <FormField
                name='idEmployee'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Input
                      {...field}
                      type='hidden'
                      defaultValue={field.value}
                      value={field.value}
                      disabled={isPending}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
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
                        {allCountries.map((country) => (
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
                    <FormLabel>Department</FormLabel>
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
                        {allDepartments.map((department) => (
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
                    <FormLabel>Job Position</FormLabel>
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
                        {allPositions.map((position) => (
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
                  Update
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
