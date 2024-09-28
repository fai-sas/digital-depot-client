import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export interface IPost {
  _id: string
  title: string
  description: string
  images: string[]
  __v: number
}

export interface ICategory {
  _id: string
  name: string
  postCount: number
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IUser {
  _id: string
  name: string
  role: string
  email: string
  status: string
  mobileNumber: string
  profilePhoto: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}

export interface IInput {
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined'
  size?: 'sm' | 'md' | 'lg'
  required?: boolean
  type?: string
  label: string
  name: string
  disabled?: boolean
}

export interface ISearchResult {
  title: string
  description: string
  thumbnail: string
  id: string
}




export interface ISearchResult {
  title: string
  description: string
  images: string[]
  _id: string
}
