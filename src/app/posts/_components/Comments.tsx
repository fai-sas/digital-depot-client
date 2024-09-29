'use client'


import { User } from '@nextui-org/user'
import { Button } from '@nextui-org/button'

import UpdateComment from './UpdateComment'

import { useDeleteComment, useGetAllComments } from '@/src/hooks/comments.hook'

const Comments = ({ postId }: any) => {
  const { data, isLoading } = useGetAllComments()
  const comments = data?.data || []

  // Filter comments by postId
  const allComments = comments.filter(
    (comment: { post: any }) => comment?.post === postId
  )

  const { mutate: handleDeleteComment } = useDeleteComment()

  // Updated handleDelete function to accept comment ID
  const handleDelete = (commentId: string) => {
    handleDeleteComment(commentId)
  }

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
            {/* Pass the specific comment ID to the delete handler */}
            <Button>
              <UpdateComment commentId={comment?._id} postId={postId} />
            </Button>
            <h1
              className='cursor-pointer'
              onClick={() => handleDelete(comment?._id)} // Pass comment._id to the handler
            >
              Delete Comment
            </h1>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  )
}

export default Comments
