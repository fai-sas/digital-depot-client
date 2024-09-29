import { useDeletePost } from '@/src/hooks/post.hook'
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  CardFooter,
  Tooltip,
} from '@nextui-org/react'
import { User } from '@nextui-org/user'
import { DeleteIcon, EditIcon } from 'lucide-react'
import Link from 'next/link'

const MyPostCard = ({ post }) => {
  const { mutate: deletePost, isPending: deletePending } = useDeletePost()

  const deletePostHandler = () => {
    deletePost(post?._id)
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
          <Link href={`/posts/update/${post?._id}`}>
            <Tooltip content='Edit post'>
              <span className='text-lg cursor-pointer text-default-400 active:opacity-50'>
                <EditIcon />
              </span>
            </Tooltip>
          </Link>
          <Tooltip color='danger' content='Delete post'>
            <span className='text-lg cursor-pointer text-danger active:opacity-50'>
              <DeleteIcon onClick={deletePostHandler} />
            </span>
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  )
}

export default MyPostCard
