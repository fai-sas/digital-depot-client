'use client'

import SinglePost from '../_components/SinglePost'

import { useGetSinglePost } from '@/src/hooks/post.hook'

interface IProps {
  params: {
    postId: string
  }
}

const PostDetailPage = ({ params: { postId } }: IProps) => {
  const { data } = useGetSinglePost(postId)

  const post = data?.data

  return (
    <div className='mx-auto my-3 max-w-[720px]'>
      {post ? <SinglePost post={post} /> : <p>Loading...</p>}
    </div>
  )
}

export default PostDetailPage
