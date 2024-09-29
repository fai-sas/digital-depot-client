import { Button } from '@nextui-org/button'

import PostTable from './components/PostTable'

import CreatePostModal from '@/src/components/modals/ClaimRequestModal'

const PostManagementPage = () => {
  return (
    <>
      <Button>
        <CreatePostModal />
      </Button>
      <PostTable />
    </>
  )
}

export default PostManagementPage
