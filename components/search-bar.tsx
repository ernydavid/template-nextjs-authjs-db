'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export function SearchBar ({ placeholder, className }: {
  placeholder: string
  className?: string
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }

    replace(`${pathname}?${params.toString()}`)
  }, 400)

  return (
    <div className='w-full relative'>
      <SearchIcon className='w-4 h-4 absolute top-[50%] translate-y-[-50%] left-3 text-muted-foreground' />
      <Input
        className={cn(
          'w-full rounded-full bg-background border-none tracking-tight pl-10',
          className
        )}
        type='search'
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  )
}
