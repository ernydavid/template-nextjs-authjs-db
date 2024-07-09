/* eslint-disable react/jsx-handler-names */
'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useTransition, useState } from 'react'

import { updateSettings } from '@/actions/settings'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

import { SettingsSchema } from '@/schemas'

import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { Switch } from '@/components/ui/switch'

import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { useRouter } from 'next/navigation'
import { SettingsIcon } from 'lucide-react'
import { User } from 'next-auth'
import { UserRole } from '@/next-auth'

interface BasiscSettingsFormProps {
  user: (User & {
    role: UserRole
    isTwoFactorEnabled: boolean
    isOAuth: boolean
}) | undefined
}

export function BasicSettingsForm ({ user }: BasiscSettingsFormProps) {
  const router = useRouter()

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled,
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
      image: user?.image || undefined
    }
  })

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      updateSettings(values)
        .then((res) => {
          if (res.error) {
            setError(res.error)
          }

          if (res.success) {
            setSuccess(res.success)
            update()
            router.refresh()
          }
        }).catch(() => {
          setError('Something went wrong!')
        })
    })
  }

  return (
    <div className='w-full flex flex-col gap-4 p-3 rounded-xl tracking-tight bg-background'>
      <div className='flex items-center gap-2'>
        <SettingsIcon className='w-5 h-5' />
        <p className='text-lg font-bold'>Account Settings</p>
      </div>
      <Form {...form}>
        <form
          className='flex flex-col gap-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Jhon Doe'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {user?.isOAuth === false && (
              <>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          readOnly
                          placeholder='jhondoe@email.com'
                          type='email'
                          disabled={isPending}
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
                          placeholder='*******'
                          type='password'
                          autoComplete='off'
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='newPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete='off'
                          placeholder='*******'
                          type='password'
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className='lg:col-span-2 col-auto'>
              {user?.isOAuth === false && (
                <FormField
                  control={form.control}
                  name='isTwoFactorEnabled'
                  render={({ field }) => (
                    <FormItem className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>
                      <div>
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable two factor authentication to your account. If 2FA is activate, on every login we will send to you a code to enter on your account.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              className='rounded-full'
              size='sm'
              type='submit'
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
