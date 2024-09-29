'use client'

import Image from 'next/image'
import DOMPurify from 'dompurify'
import { User } from '@nextui-org/user'

import { useUser } from '@/src/context/user.provider'

import moment from 'moment'

const SinglePost = ({ post }) => {
  const { user: currentUser } = useUser()
  const { title, description, images, category, rating, comments, createdAt } =
    post || {}

  const sanitizedDescription = DOMPurify.sanitize(description)

  return (
    <>
      <User
        avatarProps={{
          src: `${currentUser?.profilePhoto}`,
        }}
        isFocusable={true}
        name={currentUser?.name}
      />
      <p>Published on {moment(createdAt).format('D MMMM  YYYY')}</p>
      <div className='pb-4 border-b border-default-200'>
        <Image
          alt='Card background'
          className='object-cover rounded-xl'
          src={images[0]}
          height={500}
          width={1000}
        />
        <p className='py-4'>{category}</p>
        <p className='py-4'>{rating}</p>
        <p className='py-4'>{title}</p>

        <div
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }} // Render sanitized HTML
        />
      </div>
      <p className='py-4'>{comments}</p>
    </>
  )
}

export default SinglePost
