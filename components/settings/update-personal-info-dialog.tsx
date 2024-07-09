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
import { CalendarIcon, Edit3Icon, UserCircle2Icon } from 'lucide-react'

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
import { PersonalEmployeeInformationSchema } from '@/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'
import { updateEmployeePersonalInfo } from '@/actions/employee'
import { format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import { cn } from '@/lib/utils'
import { PersonalEmployeeInformationType } from '@/db/schema/employee'

interface UpdatePersonalInfoDialogProps {
  personalInfo: PersonalEmployeeInformationType
}

export function UpdatePersonalInfoDialog ({
  personalInfo
}: UpdatePersonalInfoDialogProps) {
  const [error, setError] = useState<string | null>()
  const [success, setSuccess] = useState<string | null>()
  const [open, setOpen] = useState(false)
  const [isPending, starTransition] = useTransition()

  const form = useForm<z.infer<typeof PersonalEmployeeInformationSchema>>({
    resolver: zodResolver(PersonalEmployeeInformationSchema),
    defaultValues: {
      id: personalInfo.id,
      address: personalInfo.address || undefined,
      birthDate: personalInfo.birthDate || undefined,
      phone: personalInfo.phone || undefined,
      cellPhone: personalInfo.cellPhone || undefined,
      idEmployee: personalInfo.idEmployee || undefined,
      identification: personalInfo.identification || undefined,
      bloodType: personalInfo.bloodType || undefined
    }
  })

  const onSubmit = async (values: z.infer<typeof PersonalEmployeeInformationSchema>) => {
    setError('')
    setSuccess('')

    starTransition(() => {
      updateEmployeePersonalInfo({
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
          variant='outline'
        >
          <Edit3Icon className='w-4 h-4' />
          <span>Update Information</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='md:max-w-[600px] h-full md:h-auto overflow-y-auto md:overflow-hidden'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <UserCircle2Icon className='w-5 h-5' />
            Personal Information
          </DialogTitle>
          <DialogDescription>
            Update your personal information to get news about bussiness events, flight tickets and benefits on our employee portal
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form
              className='grid grid-cols-1 md:grid-cols-2 gap-3 p-3 overflow-y-auto scrollbar-hide'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className='hidden'>
                <FormField
                  name='id'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type='hidden'
                          value={personalInfo.id}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='hidden'>
                <FormField
                  name='idEmployee'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type='hidden'
                          value={personalInfo.idEmployee as string}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name='identification'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identification Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='CRIB-01234567'
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
                    <FormLabel>Address</FormLabel>
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
                    <FormLabel>Phone Number</FormLabel>
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
              <FormField
                name='cellPhone'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cell Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='+34 123 3456778'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='birthDate'
                render={({ field }) => (
                  <FormItem className='w-full flex flex-col'>
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? (
                                  format(field.value, 'PPP')
                                )
                              : (
                                <span>Pick a date</span>
                                )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          classNames={{
                            caption_dropdowns: 'flex flex-col items-center text-center gap-2',
                            dropdown: 'bg-secondary py-2 px-4 font-semibold text-sm rounded-full',
                            caption_label: 'hidden'
                          }}
                          className='w-full'
                          mode='single'
                          fromYear={1910}
                          toYear={2005}
                          captionLayout='dropdown'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='bloodType'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cell Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='A+'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {success && <FormSuccess message={success} />}
              {error && <FormError message={error} />}
              <DialogFooter className='py-2 w-full col-span-1 md:col-span-2 flex items-center gap-3'>
                <DialogClose>Cancel</DialogClose>
                <Button
                  type='submit'
                  className='flex rounded-full'
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
