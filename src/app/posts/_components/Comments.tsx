'use client'

import { User } from '@nextui-org/user'
import { Tooltip } from '@nextui-org/react'
import { DeleteIcon, EditIcon } from 'lucide-react'

import UpdateComment from './UpdateComment'
import { useDeleteComment, useGetAllComments } from '@/src/hooks/comments.hook'
import { useUser } from '@/src/context/user.provider'

const Comments = ({ postId }: any) => {
  const { user } = useUser()
  const { data, isLoading } = useGetAllComments()
  const comments = data?.data || []

  const allComments = comments.filter(
    (comment: { post: any }) => comment?.post === postId
  )

  const { mutate: handleDeleteComment } = useDeleteComment()

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
            className='flex items-center justify-between gap-4 py-2 rounded-3xl'
          >
            {/* Left Section: User info and Comment */}
            <div className='flex items-center gap-4'>
              <User
                avatarProps={{
                  src: `${comment?.user?.profilePhoto}`,
                }}
                isFocusable={true}
                name={comment?.user?.name}
              />
              <p>{comment?.comment}</p>
            </div>

            {/* Right Section: Edit and Delete Icons */}
            <div className='flex items-center gap-3'>
              {user?._id === comment?.user?._id && (
                <>
                  <UpdateComment commentId={comment?._id} postId={postId} />

                  <Tooltip color='danger' content='Delete Comment'>
                    <span className='cursor-pointer text-danger active:opacity-50'>
                      <DeleteIcon onClick={() => handleDelete(comment?._id)} />
                    </span>
                  </Tooltip>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  )
}

export default Comments
