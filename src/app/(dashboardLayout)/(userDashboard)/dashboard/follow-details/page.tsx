'use client'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from '@nextui-org/react'
import { useGetMyProfile } from '@/src/hooks/user.hook'

const MyFollowersPage = () => {
  const { data: userProfile, isLoading } = useGetMyProfile()

  return (
    <>
      <section className='p-8'>
        {/* Display Followers */}
        <h1 className='py-4 font-bold '>Followers</h1>
        <Card className='container p-8 mx-auto my-4 '>
          {userProfile?.followers && userProfile?.followers.length > 0 ? (
            userProfile?.followers?.map((follower, index) => (
              <CardHeader key={index} className='flex gap-3 my-4 '>
                <Image
                  alt={follower?.name}
                  height={40}
                  radius='sm'
                  src={follower?.profilePhoto}
                  width={40}
                />
                <div className='flex flex-col'>
                  <p className='text-md'>{follower?.name}</p>
                  <p className='text-small text-default-500'>
                    {follower?.email}
                  </p>
                </div>
              </CardHeader>
            ))
          ) : (
            <p className=''>No followers yet.</p>
          )}
        </Card>
        <Divider />
        {/* Display Following */}
        <h1 className='py-4 font-bold '>Following</h1>
        <Card className='container p-8 mx-auto '>
          {userProfile?.following && userProfile?.following.length > 0 ? (
            userProfile.following.map((following, index) => (
              <CardHeader key={index} className='flex gap-3 '>
                <Image
                  alt={following?.name}
                  height={40}
                  radius='sm'
                  src={following?.profilePhoto}
                  width={40}
                />
                <div className='flex flex-col'>
                  <p className='text-md'>{following?.name}</p>
                  <p className='text-small text-default-500'>
                    {following?.email}
                  </p>
                </div>
              </CardHeader>
            ))
          ) : (
            <p>Not following anyone yet.</p>
          )}
        </Card>
      </section>
    </>
  )
}

export default MyFollowersPage
