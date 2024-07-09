interface InfoCardProps {
  title: string
  iconTitle: React.ReactNode
  total: string
}

export function DashboardSmallCardCounts ({
  title,
  iconTitle,
  total
}: InfoCardProps) {
  return (
    <div className='w-full h-24 flex rounded-xl bg-primary text-white p-3'>
      <div className='w-full h-full flex flex-col text-sm tracking-tight font-semibold gap-2'>
        <p>{title}</p>
        <div className='flex justify-end items-center gap-2'>
          {iconTitle}
          <p className='text-4xl'>{total}</p>
        </div>
      </div>
    </div>
  )
}

export function DashboardCardsWrapper ({ children }:
  {
    children: React.ReactNode
  }
) {
  return (
    <div className='hidden w-full h-24 lg:grid lg:grid-cols-3 xl:grid-cols-6 place-content-center gap-3'>
      {children}
    </div>
  )
}
