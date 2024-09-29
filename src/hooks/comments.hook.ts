import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FieldValues } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  createComment,
  deleteComment,
  getAllComments,
  getSingleComment,
  updateComment,
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

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['UPDATE_COMMENT'],
    mutationFn: async ({
      commentId,
      commentData,
    }: {
      commentId: string
      commentData: any
    }) => {
      return await updateComment(commentId, commentData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ALL_COMMENTS'],
      })
      toast.success('Comment Updated Successfully')
    },
    onError: (error: any) => {
      toast.error(error?.message)
    },
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['DELETE_COMMENT'],
    mutationFn: async (commentId: string) => await deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ALL_COMMENTS'],
      })
      toast.success('Comment Deleted Successfully')
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}
