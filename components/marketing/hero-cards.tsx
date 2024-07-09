import { CalendarDaysIcon, DumbbellIcon, FolderHeartIcon, PartyPopperIcon, TrophyIcon } from 'lucide-react'
import { InfoCard } from '@/components/marketing/info-card'

export function Cards () {
  return (
    <div className='w-full flex flex-col gap-4'>
      <h1 className='text-3xl md:text-4xl text-center text-muted-foreground tracking-tighter'>Explore our diverse sections to access</h1>
      <div className='w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        <InfoCard
          icon={<FolderHeartIcon className='group-hover:text-foreground text-primary-foreground w-7 h-7' />}
          title='Human Resources'
          subtitle='Department'
          content='Access forms, policies, and personnel-related resources.'
          href='/human-resources'
        />
        <InfoCard
          icon={<PartyPopperIcon className='group-hover:text-foreground text-primary-foreground w-7 h-7' />}
          title='Announcements'
          subtitle='& News'
          content='Stay up-to-date with the latest news, announcements and notifications.'
          href='/announcements'
        />
        <InfoCard
          icon={<CalendarDaysIcon className='group-hover:text-foreground text-primary-foreground w-7 h-7' />}
          title='Events'
          subtitle='& Highlights'
          content='Discover and participate in company-organized events, like Beyond Borders'
          href='/events'
        />
        <InfoCard
          icon={<DumbbellIcon className='group-hover:text-foreground text-primary-foreground w-7 h-7' />}
          title='Training'
          subtitle='& Development'
          content='Expand your skills and knowledge with our training and development programs.'
          href='/training'
        />
        <InfoCard
          icon={<TrophyIcon className='group-hover:text-foreground text-primary-foreground w-7 h-7' />}
          title='Benefits'
          subtitle='& Bonifications'
          content='Get information about the benefits we offer and how to make the most of them.'
          href='/benefits'
        />
      </div>
    </div>
  )
}
