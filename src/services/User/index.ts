'use server'

import axiosInstance from '@/src/lib/AxiosInstance'

export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get('/user')

    return res.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw new Error('Failed to fetch data')
  }
}

export const getSingleUser = async (userId: string) => {
  try {
    const res = await axiosInstance.get(`/user/${userId}`)

    return res.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw new Error('Failed to fetch data')
  }
}

export const updateProfile = async () => {
  try {
    const res = await axiosInstance.put(`/user/profile/update`)

    return res.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw new Error('Failed to fetch data')
  }
}

export const followUser = async (followUserId: string): Promise<any> => {
  try {
    const res = await axiosInstance.post(`user/follow/${followUserId}`)

    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}

export const unFollowUser = async (unFollowUserId: string): Promise<any> => {
  try {
    const res = await axiosInstance.post(`user/unfollow/${unFollowUserId}`)

    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}
