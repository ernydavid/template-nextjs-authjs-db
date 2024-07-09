'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { NewPasswordSchema } from '@/schemas'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { newPassword } from '@/actions/new-password'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { CredentialsCard } from './credentials-card-wrapper'

export function NewPasswordForm () {
  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <CredentialsCard
      title='Reset your password'
      subtitle='Please enter your new password'
      backButtonLabel='Go Back to Home'
      backButtonHref='/'
      image='/icon-light.svg'
      imageAlt='Icon logo of 5999 Cargo'
      imageContain
      imagefirst
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='*******'
                      type='password'
                      disabled={isPending}
                      className='bg-primary border-none text-primary-foreground placeholder:text-primary-foreground/60 rounded-lg autofillbg'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type='submit'
            className='w-full font-bold rounded-xl'
            disabled={isPending}
          >
            Save Password
          </Button>
        </form>
      </Form>
    </CredentialsCard>
  )
}
