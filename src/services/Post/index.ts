'use server'

import { FieldValues } from 'react-hook-form'

import axiosInstance from '@/src/lib/AxiosInstance'

export const createPost = async (postData: FieldValues): Promise<any> => {
  try {
    const res = await axiosInstance.post('/posts/create-post', postData)

    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}
