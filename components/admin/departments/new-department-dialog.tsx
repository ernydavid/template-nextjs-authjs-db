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
import { FlagIcon, PlusCircleIcon } from 'lucide-react'

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
import { DepartmentsSchema } from '@/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'
import { insertNewDepartment } from '@/actions/departments'

export function NewDepartmentDialog () {
  const [error, setError] = useState<string | null>()
  const [success, setSuccess] = useState<string | null>()
  const [open, setOpen] = useState(false)
  const [isPending, starTransition] = useTransition()

  const form = useForm<z.infer<typeof DepartmentsSchema>>({
    resolver: zodResolver(DepartmentsSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof DepartmentsSchema>) => {
    setError('')
    setSuccess('')

    starTransition(() => {
      insertNewDepartment({
        ...values
      }).then((res) => {
        if (res.error) {
          setError(res.error)
        }
        if (res.success) {
          form.reset()
          toast.success(res.success)
          setOpen(false)
        }
      })
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        asChild
      >
        <Button
          className='flex items-center gap-2 rounded-full'
          size='sm'
        >
          <PlusCircleIcon className='w-5 h-5' />
          <span>New Department</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <FlagIcon className='w-5 h-5' />
            New Department
          </DialogTitle>
          <DialogDescription>
            Add new department to database.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form
              className='grid gap-3 py-3'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Management'
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
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>

      </DialogContent>
    </Dialog>
  )
}
