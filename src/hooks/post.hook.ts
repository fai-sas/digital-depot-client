import { useMutation } from '@tanstack/react-query'
import { FieldValues } from 'react-hook-form'
import toast from 'react-hot-toast'

import { createPost } from '../services/Post'

export const useCreatePost = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['CREATE_POST'],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success('Post Created Successfully')
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}
