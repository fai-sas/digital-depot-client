// 'use server'

// import PostCard from './PostCard'
// import Filtering from './Filtering'

// import axiosInstance from '@/src/lib/AxiosInstance'

// const AllPosts = async ({ searchParams }: { searchParams: any }) => {
//   const params = new URLSearchParams(searchParams)

//   const { data } = await axiosInstance.get(`/posts`, {
//     params: {
//       searchTerm: params.get('search'),
//       category: params.get('category'),
//     },
//   })

//   return (
//     <section className='py-8'>
//       <h1 className='mb-8 text-3xl font-bold text-center text-purple-800'>
//         Recent Posts
//       </h1>
//       <Filtering />

//       <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
//         {data?.data?.map((post) => <PostCard key={post?._id} post={post} />)}
//       </div>
//     </section>
//   )
// }

// export default AllPosts
