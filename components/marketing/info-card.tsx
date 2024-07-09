import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle
} from '@/components/ui/card'
import Link from 'next/link'

interface InfoCardProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  content: string
  href: string
}

export function InfoCard ({
  icon,
  title,
  subtitle,
  content,
  href
}: InfoCardProps) {
  return (
    <Card className='group w-full rounded-xl bg-secondary border-none text-foreground hover:scale-105 hover:bg-primary hover:text-primary-foreground transition cursor-default relative flex justify-between flex-col'>
      <CardHeader className='p-4'>
        <CardTitle className='flex items-center gap-2 text-sm'>
          <div className='w-10 h-10 rounded-md bg-primary flex items-center justify-center group-hover:bg-background'>
            {icon}
          </div>
          <div className='flex flex-col leading-3'>
            <p className='font-bold tracking-tighter text-base'>{title}</p>
            <p className='text-muted-foreground group-hover:text-primary-foreground/90'>{subtitle}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className='text-sm p-4'>
        <p className='text-muted-foreground group-hover:text-primary-foreground/80'>{content}</p>
      </CardContent>
      <CardFooter className='w-full flex justify-end items-end pt-3'>
        <Link
          className='text-xs text-muted-foreground font-semibold group-hover:text-primary-foreground/80'
          href={href}
        >
          Show more
        </Link>
      </CardFooter>
    </Card>
  )
}
