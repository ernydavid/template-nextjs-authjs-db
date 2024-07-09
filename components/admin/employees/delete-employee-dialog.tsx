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
import { AlertOctagonIcon, Trash2Icon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/form-error'
import { toast } from 'sonner'
import { deleteEmployeeById } from '@/actions/employee'
import { useRouter } from 'next/navigation'

export const DeleteEmployeeSchema = z.object({
  id: z.string(),
  phrase: z.string().min(4, { message: 'Please enter the delete phrase' }).refine((value) => value === 'Delete Employee', { message: 'Please enter phrase' })
})

interface DeleteDialogProps {
  id: string
}

export function DeleteEmployeeDialog ({ id }: DeleteDialogProps) {
  const [error, setError] = useState<string | null>()
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof DeleteEmployeeSchema>>({
    resolver: zodResolver(DeleteEmployeeSchema),
    defaultValues: {
      id,
      phrase: '' || undefined
    }
  })

  const onSubmit = async (values: z.infer<typeof DeleteEmployeeSchema>) => {
    setError('')

    startTransition(() => {
      deleteEmployeeById(values.id, values.phrase).then((res) => {
        if (res.error) {
          setError(res.error)
        }
        if (res.success) {
          toast.success(res.success)
          setOpen(false)
          router.push('/dashboard/employees')
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
          variant='link'
        >
          <Trash2Icon className='w-4 h-4 text-destructive' />
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
        <DialogFooter className='w-full flex items-center gap-3'>
          <Form {...form}>
            <form
              className='w-full grid grid-cols-1 gap-3'
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
              <FormField
                control={form.control}
                name='phrase'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-0'>
                    <FormLabel className='text-destructive font-bold'>Type: Delete Employee</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='bg-destructive/20 w-full text-destructive font-semibold'
                        disabled={isPending}
                        autoComplete='off'
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
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
