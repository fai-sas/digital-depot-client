import { getSinglePost } from '@/src/services/Post'
import SinglePost from '../_components/SinglePost'

interface IProps {
  params: {
    postId: string
  }
}

const PostDetailPage = async ({ params: { postId } }: IProps) => {
  const { data: post } = await getSinglePost(postId)

  return (
    <div className='mx-auto my-3 max-w-[720px]'>
      <SinglePost key={post?._id} post={post} />
    </div>
  )
}

export default PostDetailPage
