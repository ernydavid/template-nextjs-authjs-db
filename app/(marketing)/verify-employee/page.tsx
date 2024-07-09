import { getEmployeeJobInfoById } from '@/actions/employee'
import { getUserById } from '@/data/user'
import { cn } from '@/lib/utils'
import { FrownIcon } from 'lucide-react'
import Link from 'next/link'
import QrCode from 'react-qr-code'

export default async function VerifiedEmployeePage ({ searchParams }: {
  searchParams: {
    id: string
  }
}) {
  const id = searchParams.id
  const user = await getUserById(id)
  const position = await getEmployeeJobInfoById(id)

  if (!user || !position) {
    return (
      <div className='w-full h-full flex flex-col items-center justify-center text-foreground tracking-tight'>
        <FrownIcon className='w-5 h-5' />
        <p className='font-semibold'>Oppss...</p>
        <p className='text-muted-foreground'>Employee not found!</p>
        <p className='text-muted-foreground text-sm'>Please verify QR code or scan QR code again</p>
        <div className='py-2'>
          <Link href='/'>
            Go home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full h-[calc(100%-20px)] p-4 flex justify-center items-center bg-[#082c50] rounded-2xl'>
      <div
        className={cn(
          'w-[54mm] h-[85.6mm] bg-gradient-to-br from-[#082c50] to-[#194d8d] overflow-hidden relative shadow-md scale-150'
        )}
      >
        <img
          className='h-full object-cover object-center fill-[#2a4a68] absolute top-0 left-0 z-0'
          src='/assets/pattern.svg'
          alt='pattern'
        />
        <div
          className='w-full h-full absolute top-0 left-0 z-10 leading-tight'
        >
          <div className='h-full flex'>
            <div className='w-full h-full justify-between flex flex-col p-4 flex-1 text-white'>
              <img
                className='w-full h-auto'
                src='/assets/logo-2024-dark.svg'
                alt='logo'
              />
              <div className='w-full relative'>
                <div className='rounded-r-2xl w-[55px] h-[90px] overflow-hidden absolute top-0 left-[70px] -z-10'>
                  {/* <img
                  className='h-[90px] object-cover object-left'
                  src={`https://flagcdn.com/${data.flag}.svg`} alt={data.flag}
                /> */}
                </div>
                <div className='rounded-2xl w-[90px] h-[90px] overflow-hidden bg-gradient-to-b from-white to-gray-100 flex items-center justify-center'>
                  {/* <img
                  className={cn(
                    'w-[110px] h-[110px] object-center',
                    data.contain ? 'object-contain' : 'object-cover'
                  )}
                  src={data.imageProfile} alt={data.name}
                /> */}
                </div>
              </div>
              <div className='flex flex-col'>
                <p className='uppercase leading-3'>
                  {user.name?.split(' ').slice(0, 1)}
                </p>
                <p className='text-xl uppercase leading-6 font-bold'>
                  {user.name?.split(' ').slice(1)}
                </p>
                <p className='uppercase text-[10px] text-white/60'>
                  {!position[0]?.position ? 'No Position' : position[0].position}
                </p>
                <p className='text-[10px] uppercase font-semibold'>
                  {!position[0]?.department ? 'Undefined' : position[0].department}
                </p>
              </div>
              <div className='flex gap-2'>
                <div className='w-[50px] h-[50px] bg-white flex items-center justify-center flex-shrink-0 p-1'>
                  <QrCode
                    value={`${process.env.NEXT_PUBLIC_APP_URL}/verify-employee?id=${id}`}
                    width={45}
                  />
                </div>
                <div className='h-full flex flex-col justify-between'>
                  <div className='flex flex-col'>
                    <p className='text-[9px]'>To validate this ID Badge, scan QR code below</p>
                  </div>
                  <p className='text-[8px]'>All rights reserved - 2024 ®</p>
                </div>
              </div>

            </div>
            <div className='w-[25px] h-full bg-white z-50 pb-5 flex justify-center items-end'>
              <img
                className='w-[22px] h-auto'
                src='/assets/slogan-vertical.svg'
                alt='slogan'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
