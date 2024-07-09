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
import { Edit3Icon, FlagIcon } from 'lucide-react'

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
import { CountriesSchema } from '@/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { editCountryById } from '@/actions/countries'
import { toast } from 'sonner'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'

export function EditCountryDialog ({
  id,
  name,
  iso2Name,
  iso3Name,
  codePhone
}: z.infer<typeof CountriesSchema>) {
  const [error, setError] = useState<string | null>()
  const [success, setSuccess] = useState<string | null>()
  const [open, setOpen] = useState(false)
  const [isPending, starTransition] = useTransition()

  const form = useForm<z.infer<typeof CountriesSchema>>({
    resolver: zodResolver(CountriesSchema),
    defaultValues: {
      id,
      name,
      iso2Name,
      iso3Name,
      codePhone
    }
  })

  const onSubmit = async (values: z.infer<typeof CountriesSchema>) => {
    setError('')
    setSuccess('')

    starTransition(() => {
      editCountryById({
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
            <FlagIcon className='w-5 h-5' />
            Edit Country
          </DialogTitle>
          <DialogDescription>
            Edit an existing country on database with ISO2, ISO3 & phone code
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
                    <FormLabel>Countrie Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Colombia'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='iso2Name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISO 2 Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='CO'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='iso3Name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISO 3 Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='COL'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='codePhone'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='+57'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {success && <FormSuccess message={success} />}
              {error && <FormError message={error} />}
              <DialogFooter className='py-2 flex items-center gap-4'>
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
