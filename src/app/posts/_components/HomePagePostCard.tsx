'use client'

import CardSkeleton from './CardSkeleton'

import { TPost } from '@/src/types'
import { useGetAllPosts } from '@/src/hooks/post.hook'
import PostCard2 from './PostCard2'

const HomePagePostCard = () => {
  const { data, isLoading } = useGetAllPosts()
  const posts = data?.data || []

  return (
    <section className='py-8'>
      <h1 className='mb-8 text-3xl font-bold text-center text-purple-800'>
        Recent Posts
      </h1>

      {/* Loading state */}
      {isLoading ? (
        <div className='flex items-center justify-center w-full min-h-screen'>
          <CardSkeleton />
        </div>
      ) : posts.length ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
          {posts.map((post: TPost) => (
            <PostCard2 key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center w-full min-h-screen'>
          <h1 className='text-4xl text-gray-500'>No Posts Found!</h1>
        </div>
      )}
    </section>
  )
}

export default HomePagePostCard
