'use client'

import {
  Card,
  CardHeader,
  CardBody,
  Image,
  User,
  Button,
  CardFooter,
} from '@nextui-org/react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import Link from 'next/link'

import { useDownVote, useUpVote } from '@/src/hooks/post.hook'
import { TPost } from '@/src/types'

export default function PostCard2({ post }: TPost) {
  const { mutate: upVotePost, isPending: upVotePending } = useUpVote()
  const { mutate: downVotePost, isPending: downVotePending } = useDownVote()

  const upVoteHandler = () => {
    upVotePost(post?._id)
  }

  const downVoteHandler = () => {
    downVotePost(post?._id)
  }

  return (
    <Card className='relative py-4 shadow-lg'>
      <CardHeader className='flex-col items-start px-4 pt-2 pb-0'>
        <h4 className='font-bold text-large'>{post?.title}</h4>
        <p className='font-bold uppercase text-tiny'>{post?.category}</p>
        <section className='flex items-center justify-between gap-4'>
          <p>Author</p>
          <User
            avatarProps={{
              src: `${post?.postedBy?.profilePhoto}`,
            }}
            isFocusable={true}
            name={post?.postedBy?.name}
          />
        </section>
        {post?.isPremium && <small className='text-default-500'>Premium</small>}
      </CardHeader>

      <CardBody className='py-2'>
        <Link href={`/posts/${post?._id}`}>
          <Image
            alt='Post Image'
            className='object-cover rounded-xl'
            src={post?.images[0]}
            width={500}
          />
        </Link>
      </CardBody>

      <CardFooter className='flex items-center justify-between px-4 py-2'>
        <div className='flex items-center gap-2'>
          <Button
            className='p-0 text-black'
            isDisabled={upVotePending}
            variant='ghost'
            onClick={upVoteHandler}
          >
            <ArrowUp
              className={`h-6 w-6 ${
                upVotePending ? 'text-gray-500' : 'text-green-500'
              }`}
            />
          </Button>
          <span>{post?.upvote}</span>
        </div>
        <p className='text-xl font-bold text-purple-600'>{post?.totalVotes}</p>
        <div className='flex items-center gap-2'>
          <Button
            className='p-0 text-black'
            isDisabled={downVotePending}
            variant='ghost'
            onClick={downVoteHandler}
          >
            <ArrowDown
              className={`h-6 w-6 ${
                downVotePending ? 'text-gray-500' : 'text-red-500'
              }`}
            />
          </Button>
          <span>{post?.downvote}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
