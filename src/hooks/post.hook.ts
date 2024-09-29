import { useMutation, useQuery } from '@tanstack/react-query'
import { FieldValues } from 'react-hook-form'
import toast from 'react-hot-toast'

import { createPost, getAllPosts, getSinglePost } from '../services/Post'

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

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ['ALL_POSTS'],
    queryFn: async () => await getAllPosts(),
  })
}

export const useSingleAllPost = (postId: string) => {
  return useQuery({
    queryKey: ['SINGLE_POST', postId],
    queryFn: async () => await getSinglePost(postId),
  })
}
