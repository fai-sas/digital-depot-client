import Search from './_components/Search'
import PostCard from './_components/PostCard'

import axiosInstance from '@/src/lib/AxiosInstance'
import { getCurrentUser } from '@/src/services/Auth'

// This is a server component
const AllPosts = async ({ searchParams }: { searchParams: any }) => {
  const params = new URLSearchParams(searchParams)

  // Fetch all posts based on search and category filters
  const { data } = await axiosInstance.get(`/posts`, {
    params: {
      search: params.get('search'),
      category: params.get('category'),
    },
  })

  // Fetch user data (assume this fetches user info from the session or API)
  const user = await getCurrentUser()

  // Filter posts based on user type
  let filteredPosts = []

  if (!user) {
    // No user: Show only non-premium posts
    filteredPosts = data?.data?.filter((post: any) => !post.isPremium)
  } else if (user?.userType === 'BASIC') {
    // Basic user: Show only non-premium posts
    filteredPosts = data?.data?.filter((post: any) => !post.isPremium)
  } else if (user?.userType === 'PREMIUM') {
    // Premium user: Show all posts
    filteredPosts = data?.data
  }

  return (
    <>
      <Search />
      <section className='py-8'>
        <h1 className='mb-8 text-3xl font-bold text-center text-purple-800'>
          Recent Posts
        </h1>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
          {filteredPosts?.length ? (
            filteredPosts.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <p className='text-center text-gray-500'>No posts found.</p>
          )}
        </div>
      </section>
    </>
  )
}

export default AllPosts
