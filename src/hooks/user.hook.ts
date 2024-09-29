import { useQuery } from '@tanstack/react-query'

import { getAllUsers, getSingleUser } from '../services/User'

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
