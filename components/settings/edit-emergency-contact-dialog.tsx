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
import { Ambulance, Edit3Icon } from 'lucide-react'

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
import { EmergencyContactsSchema } from '@/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'
import { updateEmergencyContactsById } from '@/actions/emergency'

interface EditEmergencyContactDialogProps {
  contact: {
    id: number;
    name: string | null;
    idEmployee: string | null;
    address: string | null;
    phone: string | null;
    created: Date | null;
    updatedAt: Date | null;
  }
}

export function EditEmergencyContactDialog ({
  contact
}: EditEmergencyContactDialogProps) {
  const [error, setError] = useState<string | null>()
  const [success, setSuccess] = useState<string | null>()
  const [open, setOpen] = useState(false)
  const [isPending, starTransition] = useTransition()

  const form = useForm<z.infer<typeof EmergencyContactsSchema>>({
    resolver: zodResolver(EmergencyContactsSchema),
    defaultValues: {
      id: contact.id || undefined,
      idEmployee: contact.idEmployee || undefined,
      name: contact.name || undefined,
      address: contact.address || undefined,
      phone: contact.phone || undefined
    }
  })

  const onSubmit = async (values: z.infer<typeof EmergencyContactsSchema>) => {
    setError('')
    setSuccess('')

    starTransition(() => {
      updateEmergencyContactsById({
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
          className='rounded-full'
          size='icon'
          variant='link'
        >
          <Edit3Icon className='w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Ambulance className='w-5 h-5' />
            Update Emergency Contact
          </DialogTitle>
          <DialogDescription>
            Update emergency contact in case of emergency
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form
              className='grid gap-3 py-3'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name='id'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type='hidden'
                        value={contact.id}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='idEmployee'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type='hidden'
                        value={contact.idEmployee as string}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Maria'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='address'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Street 12 #34'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='phone'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='+12 3456778'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {success && <FormSuccess message={success} />}
              {error && <FormError message={error} />}
              <DialogFooter className='py-2'>
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
