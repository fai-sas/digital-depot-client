'use client'

import {
  Card,
  CardHeader,
  Divider,
  Image,
  Chip,
  Badge,
} from '@nextui-org/react'
import {
  FileQuestion,
  Phone,
  Radiation,
  Receipt,
  UserRoundCog,
} from 'lucide-react'

import UpdateProfile from './_components/UpdateProfile'

import { useGetMe } from '@/src/hooks/user.hook'

const MyProfilePage = () => {
  const { data, isLoading } = useGetMe()

  const userProfile = data?.data

  if (isLoading) {
    return <div className='p-8 font-bold'>Loading...</div>
  }

  return (
    <>
      <Card className='container p-8 mx-auto '>
        <CardHeader className='flex gap-3 '>
          <Image
            alt={userProfile?.name}
            height={40}
            radius='sm'
            src={userProfile?.profilePhoto}
            width={40}
          />

          <div className='flex flex-col'>
            {userProfile?.isVerified ? (
              <Badge color='secondary' content='Verified'>
                <h1>{userProfile?.name}</h1>
              </Badge>
            ) : (
              <h1>{userProfile?.name}</h1>
            )}

            <p className='text-small text-default-500'>{userProfile?.email}</p>
          </div>
        </CardHeader>
        <Divider />

        <article className='grid grid-cols-1 gap-4 p-8 md:grid-cols-3'>
          <Card className='py-4'>
            <CardHeader className='flex-col items-center justify-center px-4 pt-2 pb-0 space-y-4'>
              <UserRoundCog />
              <p className='font-bold uppercase text-tiny'>Role</p>
              <Chip className='font-bold text-large' color='primary'>
                {userProfile?.role}
              </Chip>
            </CardHeader>
          </Card>

          <Card className='py-4'>
            <CardHeader className='flex-col items-center justify-center px-4 pt-2 pb-0 space-y-4'>
              <Receipt />
              <p className='font-bold uppercase text-tiny'>Profile Type</p>
              <Chip className='font-bold text-large' color='secondary'>
                {userProfile?.userType}
              </Chip>
            </CardHeader>
          </Card>

          <Card className='py-4'>
            <CardHeader className='flex-col items-center justify-center px-4 pt-2 pb-0 space-y-4'>
              <FileQuestion />
              <p className='font-bold uppercase text-tiny'>
                Verification Status
              </p>
              <Chip className='font-bold text-large' color='danger'>
                {userProfile?.isVerified ? 'Verified' : 'Unverified'}
              </Chip>
            </CardHeader>
          </Card>

          <Card className='py-4'>
            <CardHeader className='flex-col items-center justify-center px-4 pt-2 pb-0 space-y-4'>
              <Radiation />
              <p className='font-bold uppercase text-tiny'>Status</p>
              <Chip className='font-bold text-large' color='success'>
                {userProfile?.status}
              </Chip>
            </CardHeader>
          </Card>

          <Card className='py-4'>
            <CardHeader className='flex-col items-center justify-center px-4 pt-2 pb-0 space-y-4'>
              <Phone />
              <p className='font-bold uppercase text-tiny'>Phone Number</p>
              <Chip className='font-bold text-large' color='warning'>
                {userProfile?.mobileNumber}
              </Chip>
            </CardHeader>
          </Card>
        </article>

        <Divider />
        <div className='block mx-auto font-bold'>
          <UpdateProfile userProfile={userProfile} />
        </div>
      </Card>
    </>
  )
}

export default MyProfilePage
