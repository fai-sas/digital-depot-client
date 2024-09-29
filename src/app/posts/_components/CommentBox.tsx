/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
import FormController from '@/src/components/form/FormController'
import FormInput from '@/src/components/form/FormInput'
import { useUser } from '@/src/context/user.provider'
import { useCreateComment } from '@/src/hooks/comments.hook'
import { Button } from '@nextui-org/button'
import { FieldValues, SubmitHandler } from 'react-hook-form'

const CommentBox = ({ postId }: any) => {
  const { user } = useUser()

  const {
    mutate: handleCreateComment,
    isPending,
    isSuccess,
  } = useCreateComment()

  const onSubmit: SubmitHandler<FieldValues> = (commentData) => {
    commentData.post = postId
    commentData.user = user?._id
    handleCreateComment(commentData)
  }

  return user ? (
    <FormController onSubmit={onSubmit}>
      <div className='py-3'>
        <FormInput label='Comment' name='comment' type='text' />
      </div>

      <Button
        className='w-full my-3 font-semibold rounded-md bg-default-900 text-default'
        size='lg'
        type='submit'
      >
        Post Comment
      </Button>
    </FormController>
  ) : (
    <h1 className='w-1/2 p-2 my-8 text-xl border-4 rounded-2xl'>
      Please Log in to Post Comment
    </h1>
  )
}

export default CommentBox
