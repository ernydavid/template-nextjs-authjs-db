'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useState, useTransition } from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FeedbackSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { toast } from 'sonner'
import { sendFeedbackEmail } from '@/lib/mail'

export function FeedbackDialog () {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof FeedbackSchema>>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      email: '',
      feedback: '',
      screenshot: ''
    }
  })

  const onSubmit = (values: z.infer<typeof FeedbackSchema>) => {
    startTransition(async () => {
      await sendFeedbackEmail(values.email, values.feedback)
      form.reset()
      setIsOpen(false)
      toast.success('Thank you for your Feedback!')
    })
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className='rounded-full'
          variant='outline'
          size='xs'
        >
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className='p-4'>
        <DialogHeader className='py-4'>
          <DialogTitle className='text-center text-3xl font-bold tracking-tighter'>Leave Feedback</DialogTitle>
          <DialogDescription className='text-center px-3 text-base'>
            We'd love to hear what went well or how we can improve the product experience.
          </DialogDescription>
        </DialogHeader>
        <div className='px-3'>
          <Form {...form}>
            <form
              className='w-full flex flex-col gap-3'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name='email'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type='email'
                        placeholder='your@email.com'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='feedback'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        className='bg-secondary'
                        disabled={isPending}
                        placeholder='What if...'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className='flex md:flex-row md:items-center flex-col gap-3 py-4'>
                <DialogClose asChild>
                  <Button
                    variant='outline'
                    size='sm'
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  disabled={isPending}
                  size='sm'
                  type='submit'
                >
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
