import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  CardFooter,
} from '@nextui-org/react'

import { User } from '@nextui-org/user'

import Link from 'next/link'

const MyPostCard = ({ post }) => {
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
          <Button className='p-0 ' variant='ghost'>
            Update Post
          </Button>
          <Button className='p-0 ' variant='ghost'>
            Delete Post
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default MyPostCard
