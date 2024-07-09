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

import { LoginSchema } from '@/schemas'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { login } from '@/actions/login'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import Link from 'next/link'
import { FaSpinner } from 'react-icons/fa'

export function LoginForm () {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
    ? 'Email already in use with different provider!'
    : ''
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      login(values, callbackUrl).then((data) => {
        if (data?.error) {
          form.reset()
          setError(data.error)
        }

        if (data?.success) {
          form.reset()
          setSuccess(data.success)
        }

        if (data?.twoFactor) {
          setShowTwoFactor(true)
        }
      }).catch(() => {
        setError('Something went wrong!')
      })
    })
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-2'
        >
          <div className='w-full space-y-2'>
            {showTwoFactor && (
              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='123456'
                        onChange={field.onChange}
                        className='bg-primary border-none text-primary-foreground placeholder:text-primary-foreground/60 rounded-lg autofillbg'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
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
                          disabled={isPending}
                          placeholder='email@email.com'
                          type='email'
                          className='bg-primary border-none text-primary-foreground placeholder:text-primary-foreground/60 rounded-lg autofillbg'
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
                          disabled={isPending}
                          className='bg-primary border-none text-primary-foreground placeholder:text-primary-foreground/60 rounded-lg autofillbg'
                        />
                      </FormControl>
                      <Button
                        asChild
                        variant='link'
                        size='sm'
                        className='px-0 font-normal text-white/70'
                      >
                        <Link href='/auth/reset'>
                          Forgot your password
                        </Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          {(error || success) && (
            <div className='w-full'>
              {error && <FormError message={error || urlError} />}
              {success && <FormSuccess message={success} />}
            </div>
          )}
          <div className='w-full flex items-center justify-between gap-3'>
            <Button
              type='submit'
              className='px-10 font-bold rounded-xl bg-primary hover:bg-primary/80 flex items-center gap-2'
              disabled={isPending}
            >
              {isPending && <FaSpinner className='w-5 h-5 animate-spin' />}
              {showTwoFactor ? 'Confirm' : 'Login'}
            </Button>
          </div>

        </form>
      </Form>
    </div>
  )
}
