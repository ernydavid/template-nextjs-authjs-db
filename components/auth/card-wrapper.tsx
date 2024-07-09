import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card'
import Header from '@/components/auth/header'
import Social from '@/components/auth/social'
import BackButton from '@/components/auth/back-button'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps) => {
  return (
    <Card className='w-[600px] flex overflow-hidden shadow-md'>
      <div className='w-[250px] hidden md:flex bg-gradient-to-br from-[#103a6a] to-[#061c35] items-center justify-start'>
        {/* Image here.. */}
      </div>
      <div className='w-full h-full flex flex-col'>
        <CardHeader className='w-full'>
          <Header
            label={headerLabel}
          />
        </CardHeader>
        <CardContent className='w-full'>
          {children}
        </CardContent>
        {showSocial &&
          <CardFooter className='w-full'>
            <Social />
          </CardFooter>}
        <CardFooter className='w-full'>
          <BackButton
            label={backButtonLabel}
            href={backButtonHref}
          />
        </CardFooter>
      </div>
    </Card>
  )
}
