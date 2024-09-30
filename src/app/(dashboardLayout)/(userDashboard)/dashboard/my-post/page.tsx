import MyPosts from './_components/MyPosts'

import CreatePostModal from '@/src/components/modals/CreatePostModal'

export default function MyPostPage() {
  return (
    <>
      <CreatePostModal />
      <MyPosts />
    </>
  )
}
