'use client'

import { useUser } from '@/src/context/user.provider'
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  User,
  Button,
  CardFooter,
} from '@nextui-org/react'
import Link from 'next/link'

export default function PostCard({ post }) {
  const { user: currentUser } = useUser()

  return (
    <>
      <Link href={`posts/${post?._id}`}>
        <Card className='py-4 '>
          <CardHeader className='flex-col items-start px-4 pt-2 pb-0'>
            <h4 className='font-bold text-large'>{post?.title}</h4>
            <p className='font-bold uppercase text-tiny'>{post?.category}</p>
            <section className='flex items-center justify-between gap-4 '>
              <p>Author</p>
              <User
                avatarProps={{
                  src: `${currentUser?.profilePhoto}`,
                }}
                isFocusable={true}
                name={currentUser?.name}
              />
            </section>
            {post?.isPremium && (
              <small className='text-default-500'>Premium</small>
            )}
          </CardHeader>
          <CardBody className='py-2 overflow-visible'>
            <Image
              alt='Card background'
              className='object-cover rounded-xl'
              src={post?.images[0]}
              width={500}
            />
          </CardBody>
          <CardFooter className='justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
            <Button
              className='text-white text-tiny bg-black/20'
              variant='flat'
              color='default'
              radius='lg'
              size='sm'
            >
              Up Vote
            </Button>
            <Button
              className='text-white text-tiny bg-black/20'
              variant='shadow'
              color='default'
              radius='lg'
              size='sm'
            >
              Down Vote
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </>
  )
}
