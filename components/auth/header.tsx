interface HeaderProps {
  label: string
}

function Header ({
  label
}: HeaderProps) {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-y-4'>
      <img
        src='/assets/logo-2024.svg'
        alt='Logo'
        className='w-[200px] dark:hidden block'
      />
      <img
        src='/assets/logo-2024-dark.svg'
        alt='Logo'
        className='w-[200px] hidden dark:block'
      />
      <p className='text-muted-foreground tracking-tight font-semibold'>
        {label}
      </p>
    </div>
  )
}

export default Header
