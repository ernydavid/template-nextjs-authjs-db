'use client'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Edit3Icon } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { PositionsSchema } from '@/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'
import { editPositionById } from '@/actions/positions'

export function EditPositionDialog ({
  id,
  name
}: z.infer<typeof PositionsSchema>) {
  const [error, setError] = useState<string | null>()
  const [success, setSuccess] = useState<string | null>()
  const [open, setOpen] = useState(false)
  const [isPending, starTransition] = useTransition()

  const form = useForm<z.infer<typeof PositionsSchema>>({
    resolver: zodResolver(PositionsSchema),
    defaultValues: {
      id,
      name
    }
  })

  const onSubmit = async (values: z.infer<typeof PositionsSchema>) => {
    setError('')
    setSuccess('')

    starTransition(() => {
      editPositionById({
        ...values
      }).then((res) => {
        if (res.error) {
          setError(res.error)
        }
        if (res.success) {
          toast.success(res.success)
          setOpen(false)
        }
      })
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
      >
        <Button
          size='icon'
          className='rounded-full'
        >
          <Edit3Icon className='w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Edit3Icon className='w-5 h-5' />
            Edit Position
          </DialogTitle>
          <DialogDescription>
            Edit an existing position in database.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form
              className='grid gap-3 py-3'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <Input
                type='hidden'
                value={id}
              />
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Manager Country'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {success && <FormSuccess message={success} />}
              {error && <FormError message={error} />}
              <DialogFooter className='py-2 space-x-3'>
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
