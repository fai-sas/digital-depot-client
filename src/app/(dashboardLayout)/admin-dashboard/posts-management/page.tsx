
import PostTable from './components/PostTable'

import CreatePostModal from '@/src/components/modals/CreatePostModal'

const PostManagementPage = () => {
  return (
    <>
      {/* <Button> */}
      <CreatePostModal />
      {/* </Button> */}
      <PostTable />
    </>
  )
}

export default PostManagementPage
