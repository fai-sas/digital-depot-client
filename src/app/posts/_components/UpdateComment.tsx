import { Button } from '@nextui-org/button'
import { FieldValues, SubmitHandler } from 'react-hook-form'

import FormController from '@/src/components/form/FormController'
import FormInput from '@/src/components/form/FormInput'
import ModalController from '@/src/components/modals/ModalController'
import { useUser } from '@/src/context/user.provider'
import {
  useGetSingleComment,
  useUpdateComment,
} from '@/src/hooks/comments.hook'

const UpdateComment = ({ commentId, postId }) => {
  const { user } = useUser()

  const { data, isLoading } = useGetSingleComment(commentId)
  const comment = data?.data

  const {
    mutate: handleUpdateComment,
    isPending,
    isSuccess,
  } = useUpdateComment()

  // Check if the comment data is still loading
  if (isLoading) {
    return <p>Loading...</p>
  }

  // Default values for the form, initialized with the fetched comment data
  const defaultValues = {
    comment: comment?.comment,
  }

  const onSubmit: SubmitHandler<FieldValues> = (commentData) => {
    // Ensure the commentData contains the postId, userId, and commentId for the update
    handleUpdateComment({
      ...commentData,
      post: postId, // Include postId in the update
      user: user?._id, // Include userId in the update
      commentId, // Pass the comment ID for the specific comment being updated
    })
  }

  return (
    <ModalController
      buttonClassName='flex-1'
      buttonText='Update Comment'
      title='Update Comment'
    >
      <FormController defaultValues={defaultValues} onSubmit={onSubmit}>
        <div className='py-3'>
          <FormInput label='Comment' name='comment' type='text' />
        </div>

        <Button
          className='w-full my-3 font-semibold rounded-md bg-default-900 text-default'
          size='lg'
          type='submit'
        >
          Update Comment
        </Button>
      </FormController>
    </ModalController>
  )
}

export default UpdateComment
