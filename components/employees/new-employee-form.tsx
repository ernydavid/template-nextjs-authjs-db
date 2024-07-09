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

import { EmployeeSchema } from '@/schemas'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { PlusCircleIcon, UserCog2Icon } from 'lucide-react'
import { addNewEmployee } from '@/actions/employee'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent
} from '@/components/ui/select'
import { roles } from '@/lib/auth'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useCurrentRole } from '@/hooks/use-current-role'

export function NewEmployeeForm () {
  const user = useCurrentUser()
  const role = useCurrentRole()

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof EmployeeSchema>>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'employee'
    }
  })

  const onSubmit = async (values: z.infer<typeof EmployeeSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      if (user && (role === 'admin' || role === 'management')) {
        addNewEmployee(values).then((data) => {
          setError(data.error)
          setSuccess(data.success)
        })
      }
    })
  }

  return (
    <div className='w-full h-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-6'
        >
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-1'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='bg-secondary border-none rounded-xl'
                      disabled={isPending}
                      placeholder='Jhon Doe'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='bg-secondary border-none rounded-xl'
                      disabled={isPending}
                      autoComplete='off'
                      placeholder='example@example.com'
                      type='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='bg-secondary border-none rounded-xl'
                      placeholder='*******'
                      autoComplete='off'
                      type='password'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a Role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role, index) => (
                        <SelectItem
                          value={role}
                          key={index}
                        >
                          <div className='flex items-center gap-3'>
                            <UserCog2Icon className='w-4 h-4' />
                            <p>{role}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='w-full flex flex-col justify-end gap-2'>
            {(error || success) && (
              <>
                <FormError message={error} />
                <FormSuccess message={success} />
              </>
            )}
            <div className='flex items-center justify-end'>
              <Button
                variant='secondary'
                type='submit'
                className='px-16 flex items-center gap-3 rounded-full'
                disabled={isPending}
              >
                <PlusCircleIcon className='w-5 h-5' />
                <span>Add Employee</span>
              </Button>
            </div>
          </div>
        </form>
      </Form>

    </div>
  )
}
