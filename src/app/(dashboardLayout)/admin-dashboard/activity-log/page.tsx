'use client'

import { User } from '@nextui-org/user'

import moment from 'moment'

import { useGetActivity } from '@/src/hooks/user.hook'
import { Divider } from '@nextui-org/divider'

const ActivityLogPage = () => {
  const { data, error, isLoading } = useGetActivity()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading activities: {error.message}</p>
  }

  const activities = data?.data || []

  return (
    <div className='p-8'>
      <h1 className='text-xl font-bold'>Activity Log</h1>

      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        activities?.map((activity) => (
          <article key={activity?._id} className='my-4 space-y-2'>
            <User
              avatarProps={{
                src: activity?.user?.profilePhoto,
              }}
              description={activity?.user?.email}
              name={activity?.user?.name}
            />
            <Divider />
            <p className='text-gray-600'>Action: {activity?.action}</p>
            <p className='text-gray-500'>
              Details: {activity?.details} on{' '}
              {moment(activity?.createdAt).format('D MMMM YYYY, h:mm:ss a')}{' '}
            </p>
          </article>
        ))
      )}
    </div>
  )
}

export default ActivityLogPage
