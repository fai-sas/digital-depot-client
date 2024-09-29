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
