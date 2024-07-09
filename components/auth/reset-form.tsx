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

import { ResetSchema } from '@/schemas'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { reset } from '@/actions/reset-password'
import { CredentialsCard } from './credentials-card-wrapper'

export function ResetForm () {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <div>
      <CredentialsCard
        title='Forgot your Password?'
        subtitle='Please enter your email to restore your password'
        backButtonLabel='Go back to login page'
        backButtonHref='/auth/login'
        image='/icon-light.svg'
        imageContain
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='h-full w-full flex flex-col gap-6'
          >
            <div>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='colleague@5999cargo.com'
                        type='email'
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
              Send Recovery Email
            </Button>
          </form>
        </Form>
      </CredentialsCard>
    </div>
  )
}
