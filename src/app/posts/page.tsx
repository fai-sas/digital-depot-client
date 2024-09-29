import axiosInstance from '@/src/lib/AxiosInstance'
import Search from './_components/Search'

import PostCard from './_components/PostCard'

const AllPosts = async ({ searchParams }: { searchParams: any }) => {
  const params = new URLSearchParams(searchParams)

  const { data } = await axiosInstance.get(`/posts`, {
    params: {
      search: params.get('search'),
      category: params.get('category'),
    },
  })

  return (
    <>
      <Search />
      <section className='py-8'>
        <h1 className='mb-8 text-3xl font-bold text-center text-purple-800'>
          Recent Posts
        </h1>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
          {data?.data?.length ? (
            data?.data?.map((post: any) => (
              <PostCard key={post?._id} post={post} />
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
