import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FieldValues } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  createPost,
  downVote,
  getAllPosts,
  getSinglePost,
  upVote,
} from '../services/Post'

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

export const useUpVote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['UPVOTE'],
    mutationFn: async (postId: string) => await upVote(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ALL_POSTS'] })
      toast.success('Post Up Voted Successfully')
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}
export const useDownVote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['DOWNVOTE'],
    mutationFn: async (postId: string) => await downVote(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ALL_POSTS'] })
      toast.success('Post Down Voted Successfully')
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}
