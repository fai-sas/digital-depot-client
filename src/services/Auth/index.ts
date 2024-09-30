'use server'

import { FieldValues } from 'react-hook-form'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'

import axiosInstance from '@/src/lib/AxiosInstance'

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/auth/register', userData)

    if (data.success) {
      cookies().set('accessToken', data?.data?.accessToken)
      cookies().set('refreshToken', data?.data?.refreshToken)
    }

    return data
  } catch (error: any) {
    throw new Error(error)
  }
}

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', userData)

    if (data.success) {
      cookies().set('accessToken', data?.data?.accessToken)
      cookies().set('refreshToken', data?.data?.refreshToken)
    }

    return data
  } catch (error: any) {
    throw new Error(error)
  }
}

export const logout = async () => {
  cookies().delete('accessToken')
  cookies().delete('refreshToken')
}

export const getCurrentUser = async () => {
  const accessToken = cookies().get('accessToken')?.value

  let decodedToken = null

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken)

    return {
      _id: decodedToken.userId,
      name: decodedToken.name,
      email: decodedToken.email,
      mobileNumber: decodedToken.mobileNumber,
      role: decodedToken.role,
      status: decodedToken.status,
      followers: decodedToken.followers,
      following: decodedToken.following,
      profilePhoto: decodedToken.profilePhoto,
      userType: decodedToken.userType,
      isVerified: decodedToken.isVerified,
      totalCost: decodedToken.totalCost,
      paymentStatus: decodedToken.paymentStatus,
      isDeleted: decodedToken.isDeleted,
      isBlocked: decodedToken.isBlocked,
    }
  }

  return decodedToken
}

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get('refreshToken')?.value

    console.log('REFRESH_TOKEN:', refreshToken)

    const res = await axiosInstance({
      url: '/auth/refresh-token',
      method: 'POST',
      withCredentials: true,
      headers: {
        cookies: `refreshToken=${refreshToken}`,
      },
    })

    console.log('RES_DATA:', res.data)

    return res.data
  } catch (error) {
    throw new Error('Failed to get new access token')
  }
}
