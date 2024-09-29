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
import { EditIcon } from 'lucide-react'

const UpdateComment = ({ commentId, postId }) => {
  const { user } = useUser()

  const { data, isLoading } = useGetSingleComment(commentId)
  const comment = data?.data

  const { mutate: handleUpdateComment, isPending } = useUpdateComment()

  if (isLoading) {
    return <p>Loading...</p>
  }

  const defaultValues = {
    comment: comment?.comment || '',
  }

  const onSubmit: SubmitHandler<FieldValues> = (commentData) => {
    if (!commentId) {
      console.error('Comment ID is undefined!')
      return
    }

    handleUpdateComment({
      commentId,
      commentData: {
        comment: commentData.comment,
        post: postId,
        user: user?._id,
      },
    })
  }

  return (
    <ModalController
      buttonClassName='flex-1'
      // buttonText='Edit'
      buttonText={
        <span>
          <EditIcon />
        </span>
      }
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
          {isPending ? 'Updating...' : 'Update Comment'}
        </Button>
      </FormController>
    </ModalController>
  )
}

export default UpdateComment
