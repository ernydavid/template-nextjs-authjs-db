import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ExtendedUser } from '@/next-auth'
import { GlobeIcon } from 'lucide-react'
import { Badge } from '../ui/badge'

interface UserInfoProps {
  user?: ExtendedUser,
  label: string
}

function UserInfo ({ user, label }: UserInfoProps) {
  return (
    <Card className='w-full max-w-[600px] flex flex-col justify-start items-center'>
      <CardHeader className='flex flex-row items-center gap-3'>
        <GlobeIcon className='w-5 h-5' />
        <p className='font-bold text-2xl'>
          {label}
        </p>
      </CardHeader>
      <CardContent className='w-full'>
        <div className='w-full flex items-center justify-between p-2'>
          <p className='font-semibold text-sm'>
            ID:
          </p>
          <p className='text-sm'>
            {user?.id}
          </p>
        </div>
        <div className='w-full flex items-center justify-between p-2'>
          <p className='font-semibold text-sm'>
            Name:
          </p>
          <p className='text-sm'>
            {user?.name}
          </p>
        </div>
        <div className='w-full flex items-center justify-between p-2'>
          <p className='font-semibold text-sm'>
            Email:
          </p>
          <p className='text-sm'>
            {user?.email}
          </p>
        </div>
        <div className='w-full flex items-center justify-between p-2'>
          <p className='font-semibold text-sm'>
            Role:
          </p>
          <p className='text-sm'>
            {user?.role}
          </p>
        </div>
        <div className='w-full flex items-center justify-between p-2'>
          <p className='font-semibold text-sm'>
            Two Factor Authentication:
          </p>
          <Badge
            className='text-sm'
            variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}
          >
            {user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserInfo
