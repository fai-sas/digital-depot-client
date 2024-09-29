'use client'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from '@nextui-org/react'

import { useGetMyProfile } from '@/src/hooks/user.hook'

const MyProfilePage = () => {
  const { data: userProfile, isLoading } = useGetMyProfile()

  console.log(userProfile)

  if (isLoading) {
    return <div className='p-8 font-bold'>Loading...</div>
  }

  return (
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
          <p className='text-md'>{userProfile?.name}</p>
          <p className='text-small text-default-500'>{userProfile?.email}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Role: {userProfile?.role}</p>
        <p>Status: {userProfile?.status}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        {/* Display Followers */}
        <h1>Followers:</h1>
        {userProfile?.followers && userProfile?.followers.length > 0 ? (
          userProfile.followers.map((follower, index) => (
            <p key={index}>Follower: {follower.name}</p>
          ))
        ) : (
          <p>No followers yet.</p>
        )}

        {/* Display Following */}
        <h1>Following:</h1>
        {userProfile?.following && userProfile?.following.length > 0 ? (
          userProfile.following.map((following, index) => (
            <p key={index}>Following: {following.name}</p>
          ))
        ) : (
          <p>Not following anyone yet.</p>
        )}
      </CardFooter>
    </Card>
  )
}

export default MyProfilePage
