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
import { AlertOctagonIcon } from 'lucide-react'

export function DeleteDialog () {
  return (
    <Dialog>
      <DialogTrigger>
        Open
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <AlertOctagonIcon className='w-5 h-5 text-destructive' />
          <DialogTitle className='flex items-center text-destructive'>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete and remove from our database.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button
            variant='destructive'
            size='sm'
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
