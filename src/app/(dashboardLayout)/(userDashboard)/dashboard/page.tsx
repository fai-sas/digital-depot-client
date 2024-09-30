'use client'

import { User } from '@nextui-org/user'
import { Card, CardHeader, Chip, Badge } from '@nextui-org/react'
import {
  Eye,
  Forward,
  Heart,
  MessageSquareMore,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react'

import { useGetAllPosts } from '@/src/hooks/post.hook'
import { useGetAllComments } from '@/src/hooks/comments.hook'
import { useGetMe } from '@/src/hooks/user.hook'

const DashboardPage = () => {
  // Always call hooks at the top level of the component
  const { data: postsData } = useGetAllPosts()
  const { data: userData } = useGetMe()
  const { data: commentData } = useGetAllComments()

  const user = userData?.data
  const posts = postsData?.data || []
  const userPosts = posts?.filter((post) => post?.postedBy?._id === user?._id)

  const views = userPosts?.reduce(
    (accumulator, post) => accumulator + (post.views || 0),
    0
  )
  const upVotes = userPosts?.reduce(
    (accumulator, post) => accumulator + (post.upvote || 0),
    0
  )
  const downVotes = userPosts?.reduce(
    (accumulator, post) => accumulator + (post.downvote || 0),
    0
  )
  const totalVotes = userPosts?.reduce(
    (accumulator, post) => accumulator + (post.totalVotes || 0),
    0
  )

  // Conditional rendering inside JSX
  return (
    <>
      <section className='flex items-center justify-center gap-4 p-8 text-xl '>
        <h1 className=''>Welcome</h1>
        {user && (
          <User
            avatarProps={{
              src:
                typeof user?.profilePhoto === 'string' ? user.profilePhoto : '',
            }}
            isFocusable={true}
            name=''
          />
        )}
        {user?.isVerified ? (
          <Badge color='secondary' content='Verified'>
            <h1>{user?.name}</h1>
          </Badge>
        ) : (
          <h1>{user?.name}</h1>
        )}
      </section>

      <article className='grid grid-cols-1 gap-4 p-8 md:grid-cols-3'>
        <Card className='py-4'>
          <CardHeader className='flex-col items-center justify-center px-4 pt-2 pb-0 space-y-4'>
            <Eye />
            <p className='font-bold uppercase text-tiny'>Total Post Views</p>
            <Chip className='font-bold text-large' color='success'>
              {views || 0}
            </Chip>
          </CardHeader>
        </Card>

        <Card className='py-4'>
          <CardHeader className='flex-col items-center justify-center px-4 pt-2 pb-0 space-y-4'>
            <MessageSquareMore />
            <p className='font-bold uppercase text-tiny'>Total Comments</p>
            <Chip className='font-bold text-large' color='warning'>
              {commentData?.data?.length || 0}
            </Chip>
          </CardHeader>
        </Card>

        <Card className='py-4'>
          <CardHeader className='flex-col items-center justify-center px-4 pt-2 pb-0 space-y-4'>
            <Forward />
            <p className='font-bold uppercase text-tiny'>Total Shares</p>
            <Chip className='font-bold text-large' color='primary'>
              {0}
            </Chip>
          </CardHeader>
        </Card>

        <Card className='py-4'>
          <CardHeader className='flex-col items-center justify-center px-4 pt-2 pb-0 space-y-4'>
            <ThumbsUp />
            <p className='font-bold uppercase text-tiny'>Total Up Votes</p>
            <Chip className='font-bold text-large' color='success'>
              {upVotes || 0}
            </Chip>
          </CardHeader>
        </Card>

        <Card className='py-4'>
          <CardHeader className='flex-col items-center justify-center px-4 pt-2 pb-0 space-y-4'>
            <Heart />
            <p className='font-bold uppercase text-tiny'>Total Votes</p>
            <Chip className='font-bold text-large' color='secondary'>
              {totalVotes || 0}
            </Chip>
          </CardHeader>
        </Card>

        <Card className='py-4'>
          <CardHeader className='flex-col items-center justify-center px-4 pt-2 pb-0 space-y-4'>
            <ThumbsDown />
            <p className='font-bold uppercase text-tiny'>Total Down Votes</p>
            <Chip className='font-bold text-large' color='danger'>
              {downVotes || 0}
            </Chip>
          </CardHeader>
        </Card>
      </article>
    </>
  )
}

export default DashboardPage
