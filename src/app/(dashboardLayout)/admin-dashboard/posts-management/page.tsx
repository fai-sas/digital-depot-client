import PostTable from '../user-management/components/PostTable'

import CreatePostModal from '@/src/components/modals/ClaimRequestModal'

const PostManagementPage = () => {
  return (
    <>
      <CreatePostModal />
      <PostTable />
    </>
  )
}

export default PostManagementPage
