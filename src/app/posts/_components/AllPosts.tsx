'use client'

import PostCard from './PostCard'

import { TPost } from '@/src/types'
import { useGetAllPosts } from '@/src/hooks/post.hook'

const AllPosts = () => {
  const { data, isLoading } = useGetAllPosts()
  const posts = data?.data || []

  return (
    <section className='grid grid-cols-2 gap-4 py-4 md:grid-cols-3'>
      {isLoading && (
        <h1 className='p-8 text-4xl font-bold text-purple-800 '>Loading</h1>
      )}
      {posts?.length ? (
        posts?.map((post: TPost) => <PostCard key={post?._id} post={post} />)
      ) : (
        <div className='flex items-center justify-center w-full min-h-screen rounded-md bg-default-100'>
          {isLoading && (
            <h1 className='p-8 text-4xl font-bold text-purple-800 '>Loading</h1>
          )}
          <h1 className='text-4xl'>No Post Found!</h1>
        </div>
      )}
    </section>
  )
}

export default AllPosts
