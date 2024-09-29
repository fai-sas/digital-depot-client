'use client'

import CreateBlogPost from '@/src/app/(dashboardLayout)/admin-dashboard/posts-management/components/CreatePost'
import ModalController from './ModalController'

export default function CreatePostModal() {
  return (
    <ModalController
      buttonClassName='flex-1'
      buttonText='Create Post'
      title='Create Post'
    >
      <CreateBlogPost />
    </ModalController>
  )
}
