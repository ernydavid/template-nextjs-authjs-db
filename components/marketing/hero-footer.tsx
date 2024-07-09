import { CheckCircleIcon, ListChecksIcon, MessagesSquareIcon, MonitorSmartphoneIcon, UsersIcon } from 'lucide-react'

export function HeroFooter () {
  return (
    <div className='w-full flex flex-col lg:flex-row md:mt-48 mt-32 lg:justify-between lg:items-center gap-6'>
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center mx-auto gap-6 md:gap-2'>
        <img
          loading='lazy'
          className='w-full max-w-[380px] object-contain'
          src='/assets/hero-image-2.png'
          alt='Contact Center Employee image'
        />
        <div className='flex lg:flex-col justify-center lg:justify-start items-center lg:items-start lg:gap-2 gap-6 px-6'>
          <div className='group w-16 h-16 lg:w-24 lg:h-24 flex items-center justify-center bg-primary rounded-full lg:-translate-x-12 transition hover:bg-secondary cursor-pointer'>
            <MonitorSmartphoneIcon className='w-10 h-10 text-primary-foreground group-hover:text-primary transition' />
          </div>
          <div className='group w-16 h-16 lg:w-24 lg:h-24 flex items-center justify-center bg-primary rounded-full transition hover:bg-secondary cursor-pointer'>
            <MessagesSquareIcon className='w-10 h-10 text-primary-foreground group-hover:text-primary transition' />
          </div>
          <div className='group w-16 h-16 lg:w-24 lg:h-24 flex items-center justify-center bg-primary rounded-full transition hover:bg-secondary cursor-pointer'>
            <UsersIcon className='w-10 h-10 text-primary-foreground group-hover:text-primary transition' />
          </div>
          <div className='group w-16 h-16 lg:w-24 lg:h-24 flex items-center justify-center bg-primary rounded-full lg:-translate-x-12 transition hover:bg-secondary cursor-pointer'>
            <ListChecksIcon className='w-10 h-10 text-primary-foreground group-hover:text-primary transition' />
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col gap-2 lg:justify-end'>
        <p className='w-full text-2xl md:text-4xl font-bold tracking-tighter text-center lg:text-right'>Stay connected with your colleagues and departments.</p>
        <div className='w-full flex items-center justify-center lg:justify-end gap-3'>
          <CheckCircleIcon className='text-muted-foreground w-6 h-6' />
          <p className='text-muted-foreground tracking-tighter lg:text-right text-sm md:text-base'>Manage your Tasks</p>
        </div>
        <div className='w-full flex items-center justify-center lg:justify-end gap-3'>
          <CheckCircleIcon className='text-muted-foreground w-6 h-6' />
          <p className='text-muted-foreground tracking-tighter lg:text-right text-sm md:text-base'>Check your Work Performance</p>
        </div>
        <div className='w-full flex items-center justify-center lg:justify-end gap-3'>
          <CheckCircleIcon className='text-muted-foreground w-6 h-6' />
          <p className='text-muted-foreground tracking-tighter lg:text-right text-sm md:text-base'>Explore All Benefits Availables</p>
        </div>
        <div className='w-full flex items-center justify-center lg:justify-end gap-3'>
          <CheckCircleIcon className='text-muted-foreground w-6 h-6' />
          <p className='text-muted-foreground tracking-tighter lg:text-right text-sm md:text-base'>Stay alert to Annoucements and Work News</p>
        </div>
        <div className='w-full flex items-center justify-center lg:justify-end gap-3'>
          <CheckCircleIcon className='text-muted-foreground w-6 h-6' />
          <p className='text-muted-foreground tracking-tighter lg:text-right text-sm md:text-base'>Manage all Request, and Work Documents</p>
        </div>
      </div>
    </div>
  )
}
