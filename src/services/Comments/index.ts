'use server'

import { FieldValues } from 'react-hook-form'

import axiosInstance from '@/src/lib/AxiosInstance'

export const createComment = async (postData: FieldValues): Promise<any> => {
  try {
    const res = await axiosInstance.post('/comments/create-comment', postData)

    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getAllComments = async () => {
  try {
    const res = await axiosInstance.get('/comments')

    return res.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw new Error('Failed to fetch data')
  }
}

export const getSingleComment = async (commentId: string) => {
  try {
    const res = await axiosInstance.get(`/comments/${commentId}`)

    return res.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw new Error('Failed to fetch data')
  }
}

export const updateComment = async (
  commentId: string,
  commentData: any
): Promise<any> => {
  try {
    const res = await axiosInstance.put(
      `/comments/update/${commentId}`,
      commentData
    )

    return res.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Error while updating comment'
    )
  }
}

export const deleteComment = async (commentId: string): Promise<any> => {
  try {
    const res = await axiosInstance.delete(`/comments/${commentId}`)

    return res.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Error while deleting comment'
    )
  }
}
