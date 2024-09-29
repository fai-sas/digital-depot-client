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

export const getAllPosts = async () => {
  try {
    const res = await axiosInstance.get('/posts')

    return res.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw new Error('Failed to fetch data')
  }
}

export const getSinglePost = async (postId: string) => {
  try {
    const res = await axiosInstance.get(`/posts/${postId}`)

    return res.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw new Error('Failed to fetch data')
  }
}
