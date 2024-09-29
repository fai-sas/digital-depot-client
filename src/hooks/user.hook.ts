import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  followUser,
  getAllUsers,
  getMyProfile,
  getSingleUser,
  unFollowUser,
  updateProfile,
} from '../services/User'

import toast from 'react-hot-toast'
import { getCurrentUser } from '../services/Auth'

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ['ALL_USERS'],
    queryFn: async () => await getAllUsers(),
  })
}

export const useGetSingleUser = (userId: string) => {
  return useQuery({
    queryKey: ['SINGLE_USER', userId],
    queryFn: async () => await getSingleUser(userId),
  })
}

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ['MY_PROFILE'],
    queryFn: async () => await getCurrentUser(),
  })
}

export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['UPDATE_PROFILE'],
    mutationFn: async () => await updateProfile(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['MY_PROFILE', 'SINGLE_USER', 'ALL_USERS'],
      })
      toast.success('Profile Updated Successfully')
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}

export const useFollowUser = () => {
  const queryClient = useQueryClient()

  return useMutation<any, Error, string>({
    mutationKey: ['FOLLOW_USER'],
    mutationFn: async (followUserId) => await followUser(followUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ALL_USERS', 'SINGLE_USER'] })
      toast.success('User Followed Successfully')
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}

export const useUnFollowUser = () => {
  const queryClient = useQueryClient()

  return useMutation<any, Error, string>({
    mutationKey: ['UNFOLLOW_USER'],
    mutationFn: async (unFollowUserId) => await unFollowUser(unFollowUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ALL_USERS', 'SINGLE_USER'] })
      toast.success('User Un Followed Successfully')
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}
