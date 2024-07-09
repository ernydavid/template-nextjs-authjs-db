'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { EditEmployeeSchema } from '@/schemas'
import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { UserType } from '@/db/schema/users'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { UserCog2Icon } from 'lucide-react'
import { roles } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'
import { editBasicInfoEmployee } from '@/actions/employee'

export function EditEmployeeForm ({ user }: {
  user: UserType
}) {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof EditEmployeeSchema>>({
    resolver: zodResolver(EditEmployeeSchema),
    defaultValues: {
      id: user.id,
      name: user.name || undefined,
      email: user.email || undefined,
      role: user.role || undefined
    }
  })

  const onSubmit = (values: z.infer<typeof EditEmployeeSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      editBasicInfoEmployee({
        ...values
      }).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return (
    <div className='w-full flex rounded-xl bg-background'>
      <Form {...form}>
        <form
          className='w-full flex flex-col gap-6'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <input
              name='id'
              type='hidden'
              value={user.id}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete='off'
                      placeholder='Jhon Doe'
                      disabled={isPending}
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
                  <FormLabel>Employee Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete='off'
                      placeholder='employeee@5999cargo.com'
                      type='email'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='col-span-1 md:col-span-2'>
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee Role</FormLabel>
                    <Select
                      disabled={isPending}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a role' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((item, index) => (
                          <SelectItem
                            key={index}
                            value={item}
                          >
                            <div className='flex items-center gap-2'>
                              <UserCog2Icon className='w-4 h-4' />
                              <p className='font-semibold tracking-tight'>{item}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type='submit'
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  )
}
