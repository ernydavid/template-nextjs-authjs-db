'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertOctagonIcon, EraserIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { FormError } from '@/components/form-error'
import { toast } from 'sonner'
import { deletePositionById } from '@/actions/positions'

const DeletePositionSchema = z.object({
  id: z.number()
})

interface DeleteDialogProps {
  id: number
}

export function DeletePositionDialog ({ id }: DeleteDialogProps) {
  const [error, setError] = useState<string | null>()
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof DeletePositionSchema>>({
    resolver: zodResolver(DeletePositionSchema),
    defaultValues: {
      id
    }
  })

  const onSubmit = async (values: z.infer<typeof DeletePositionSchema>) => {
    setError('')

    startTransition(() => {
      deletePositionById(values.id).then((res) => {
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
      <DialogTrigger asChild>
        <Button
          className='rounded-full'
          size='icon'
          variant='destructive'
        >
          <EraserIcon className='w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <AlertOctagonIcon className='w-5 h-5 text-destructive hidden sm:block' />
          <DialogTitle className='flex justify-center text-center sm:justify-start sm:text-left items-center text-destructive'>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete and remove from our database.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='space-x-3'>
          <Form {...form}>
            <form
              className='grid gap-3'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name='id'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type='hidden'
                        disabled={isPending}
                        value={id}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {error && <FormError message={error} />}
              <div className='w-full flex justify-end items-center gap-3'>
                <DialogClose asChild>
                  <Button
                    variant='outline'
                    size='sm'
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type='submit'
                  variant='destructive'
                  size='sm'
                  disabled={isPending}
                >
                  Delete
                </Button>
              </div>
            </form>
          </Form>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
