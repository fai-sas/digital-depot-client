import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FieldValues } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  createComment,
  getAllComments,
  getSingleComment,
} from '../services/Comments'

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation<any, Error, FieldValues>({
    mutationKey: ['CREATE_COMMENT'],
    mutationFn: async (commentData) => await createComment(commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ALL_COMMENTS'] })
      toast.success('comment Created Successfully')
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}

export const useGetAllComments = () => {
  return useQuery({
    queryKey: ['ALL_COMMENTS'],
    queryFn: async () => await getAllComments(),
  })
}

export const useGetSingleComment = (commentId: string) => {
  return useQuery({
    queryKey: ['SINGLE_COMMENT', commentId],
    queryFn: async () => await getSingleComment(commentId),
  })
}
