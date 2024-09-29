import EditPost from '@/src/app/(dashboardLayout)/admin-dashboard/posts-management/components/EditPost'

interface IProps {
  params: {
    postId: string
  }
}

const UpdatePage = ({ params: { postId } }: IProps) => {
  return <EditPost postId={postId} />
}

export default UpdatePage
