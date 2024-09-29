/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import DOMPurify from 'dompurify'
import { User } from '@nextui-org/user'
import moment from 'moment'
import CommentBox from './CommentBox'
import { Divider } from '@nextui-org/divider'
import Comments from './Comments'

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
  } = post || {}

  const sanitizedDescription = DOMPurify.sanitize(description)

  return (
    <>
      <User
        avatarProps={{
          src: `${post?.postedBy?.profilePhoto}`,
        }}
        isFocusable={true}
        name={post?.postedBy?.name}
      />
      <p>Published on {moment(createdAt).format('D MMMM  YYYY')}</p>
      <div className='pb-4 border-b border-default-200'>
        <Image
          alt='Card background'
          className='object-cover rounded-xl'
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
