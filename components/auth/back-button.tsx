'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface BackButtonProps {
  label: string
  href: string
}

function BackButton ({
  label,
  href
}: BackButtonProps) {
  return (
    <Button
      variant='link'
      size='sm'
      className='w-full font-normal'
      asChild
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  )
}

export default BackButton
