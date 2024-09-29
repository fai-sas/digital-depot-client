'use client'

import PostCard from './PostCard'

import { useGetAllPosts } from '@/src/hooks/post.hook'

const AllPosts = () => {
  const { data } = useGetAllPosts()
  const posts = data?.data || []

  return (
    <section className='grid grid-cols-2 gap-4 py-4 md:grid-cols-3'>
      {posts?.length ? (
        posts.map((post: any, index: number) => (
          <PostCard key={index} post={post} />
        ))
      ) : (
        <div className='flex items-center justify-center w-full min-h-screen rounded-md bg-default-100'>
          <h1 className='text-4xl'>No Claim Request Received!</h1>
        </div>
      )}
    </section>
  )
}

export default AllPosts
