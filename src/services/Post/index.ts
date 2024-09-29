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

export const upVote = async (postId: string): Promise<any> => {
  try {
    const res = await axiosInstance.put(`/posts/upvote/${postId}`)

    return res.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error while up voting')
  }
}

export const downVote = async (postId: string): Promise<any> => {
  try {
    const res = await axiosInstance.put(`/posts/downvote/${postId}`)

    return res.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error while up voting')
  }
}

export const updatePost = async (
  postId: string,
  postData: any
): Promise<any> => {
  try {
    const res = await axiosInstance.put(`/posts/update/${postId}`, postData)

    return res.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Error while updating post'
    )
  }
}

export const deletePost = async (postId: string): Promise<any> => {
  try {
    const res = await axiosInstance.delete(`/posts/${postId}`)

    return res.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Error while deleting post'
    )
  }
}
