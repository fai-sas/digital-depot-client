'use client'

import ModalController from './ModalController'

import CreateBlogPost from '@/src/app/(dashboardLayout)/admin-dashboard/posts-management/components/CreatePost'

export default function CreatePostModal() {
  return (
    <ModalController
      buttonClassName='flex justify-end p-4 '
      buttonText='Create Post'
      buttonVariant='ghost'
      title='Create Post'
    >
      <CreateBlogPost />
    </ModalController>
  )
}
