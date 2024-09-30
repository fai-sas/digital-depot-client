'use client'

import { motion } from 'framer-motion'

import CardSkeleton from './CardSkeleton'
import PostCard2 from './PostCard2'

import { TPost } from '@/src/types'
import { useGetAllPosts } from '@/src/hooks/post.hook'
import { useUser } from '@/src/context/user.provider'

const HomePagePostCard = () => {
  const { user } = useUser()
  const { data, isLoading } = useGetAllPosts()
  const posts = data?.data || []

  // Filter posts based on user status
  let filteredPosts = []

  if (!user) {
    // If no user, show only non-premium posts
    filteredPosts = posts.filter((post) => !post.isPremium)
  } else if (user?.userType === 'BASIC') {
    // If basic user, show only non-premium posts
    filteredPosts = posts.filter((post) => !post.isPremium)
  } else if (user?.userType === 'PREMIUM') {
    // If premium user, show all posts
    filteredPosts = posts
  }

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
      ) : filteredPosts.length > 0 ? (
        <motion.div
          layout
          animate={{ opacity: 1 }}
          className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredPosts.map((post: TPost) => (
            <motion.div key={post._id} layout>
              <PostCard2 post={post} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className='flex items-center justify-center w-full min-h-screen'>
          <h1 className='text-4xl text-gray-500'>No Posts Found!</h1>
        </div>
      )}
    </section>
  )
}

export default HomePagePostCard
