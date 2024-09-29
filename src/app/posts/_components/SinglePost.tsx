'use client'

import Image from 'next/image'
import DOMPurify from 'dompurify'
import { User } from '@nextui-org/user'
import moment from 'moment'
import CommentBox from './CommentBox'
import { Divider } from '@nextui-org/divider'
import Comments from './Comments'
import { Button } from '@nextui-org/button'
import { useUser } from '@/src/context/user.provider'
import { useFollowUser, useUnFollowUser } from '@/src/hooks/user.hook'

const SinglePost = ({ post }: any) => {
  const {
    _id,
    title,
    description,
    images,
    category,
    rating,
    comments,
    createdAt,
    postedBy,
  } = post || {}

  const sanitizedDescription = DOMPurify.sanitize(description)
  const postedByUser = postedBy?._id

  const { user } = useUser() // Get current logged-in user

  const { mutate: handleFollowUser, isPending: followUserPending } =
    useFollowUser()
  const { mutate: handleUnFollowUser, isPending: UnFollowUserPending } =
    useUnFollowUser()

  // Ensure the following array exists and is not undefined or null
  const followingList = user?.following || []

  // Check if the current user is already following the postedByUser
  const isFollowing = followingList.some(
    (userId: string) => userId === postedByUser
  )

  console.log(user)

  console.log(isFollowing)

  const handleFollow = () => {
    if (postedByUser) {
      handleFollowUser(postedByUser)
    }
  }

  const handleUnFollow = () => {
    if (postedByUser) {
      handleUnFollowUser(postedByUser)
    }
  }

  return (
    <>
      <section className='flex justify-between'>
        <User
          avatarProps={{
            src: `${post?.postedBy?.profilePhoto}`,
          }}
          isFocusable={true}
          name={post?.postedBy?.name}
        />

        {/* Conditionally show follow/unfollow buttons */}
        {!isFollowing ? (
          <Button disabled={followUserPending} onClick={handleFollow}>
            Follow User
          </Button>
        ) : (
          <Button
            variant='bordered'
            disabled={UnFollowUserPending}
            onClick={handleUnFollow}
          >
            Unfollow User
          </Button>
        )}
      </section>

      <small className='py-2'>
        Published on {moment(createdAt).format('D MMMM YYYY')}
      </small>

      <div className='pb-4 border-b border-default-200'>
        <Image
          alt='Card background'
          className='object-cover my-2 rounded-xl'
          height={500}
          src={images?.[0]}
          width={1000}
        />
        <p className='py-4'>{category}</p>
        <p className='py-4'>{rating}</p>
        <p className='py-4'>{title}</p>

        <div
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }} // Render sanitized HTML
        />
      </div>
      <Divider />

      <Comments postId={_id} />

      <Divider />

      <CommentBox postId={_id} />
      <p className='py-4'>{comments}</p>
    </>
  )
}

export default SinglePost
