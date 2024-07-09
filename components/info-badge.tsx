import { cn } from '@/lib/utils'
import { AtSignIcon, CalendarDaysIcon, MapPinIcon, PhoneCallIcon, SmartphoneIcon, SquareUserRoundIcon, SyringeIcon, User2Icon } from 'lucide-react'

interface InfoBadgeProps {
  children: React.ReactNode
  className?: string
  icon?: 'phone' | 'user' | 'date' | 'email' | 'mobile' | 'syringe' | 'address' | 'id' | null
}

export function InfoBadge ({
  children,
  className,
  icon
}: InfoBadgeProps, props: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'px-3 py-1 rounded-full bg-secondary text-sm font-semibold tracking-tight hover:bg-secondary/80 transition text-center text-wrap flex items-center gap-1',
        className
      )}
    >
      {icon &&
      icon === 'address'
        ? <MapPinIcon className='w-3 h-3' />
        : icon === 'date'
          ? <CalendarDaysIcon className='w-3 h-3' />
          : icon === 'email'
            ? <AtSignIcon className='w-3 h-3' />
            : icon === 'id'
              ? <SquareUserRoundIcon className='w-3 h-3' />
              : icon === 'phone'
                ? <PhoneCallIcon className='w-3 h-3' />
                : icon === 'mobile'
                  ? <SmartphoneIcon className='w-3 h-3' />
                  : icon === 'syringe'
                    ? <SyringeIcon className='w-3 h-3' />
                    : icon === 'user' && <User2Icon className='w-3 h-3' />}
      {children}
    </div>
  )
}
