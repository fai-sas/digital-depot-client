import { Divider } from '@nextui-org/divider'

import { useGetAllComments } from '@/src/hooks/comments.hook'
import { User } from '@nextui-org/user'

const Comments = ({ postId }: any) => {
  const { data, isLoading } = useGetAllComments()
  const comments = data?.data || []

  // Filter comments by postId
  const allComments = comments.filter(
    (comment: { post: any }) => comment?.post === postId
  )

  if (isLoading) {
    return <p>Loading comments...</p>
  }

  return (
    <div className=''>
      <h2 className='py-4'>Comments</h2>
      {allComments?.length > 0 ? (
        allComments?.map((comment: any) => (
          <div
            key={comment?._id}
            className='flex items-center gap-4 rounded-3xl'
          >
            <User
              avatarProps={{
                src: `${comment?.user?.profilePhoto}`,
              }}
              isFocusable={true}
              name={comment?.user?.name}
            />

            <p>{comment?.comment}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  )
}

export default Comments
