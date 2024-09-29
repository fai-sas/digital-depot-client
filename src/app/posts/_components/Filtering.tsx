'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@nextui-org/button'
import { RotateCw } from 'lucide-react'
import { useGetAllPosts } from '@/src/hooks/post.hook'

const Filtering = ({
  resetSearchAndFilter,
}: {
  resetSearchAndFilter: () => void
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { data } = useGetAllPosts()
  const { data: categories } = data || []

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())

    const [key, value] = category.split('=')
    params.set(key, value)

    router.push(`/posts?${params.toString()}`)
  }

  return (
    <div className='flex items-center justify-end my-5'>
      <div className='flex justify-center gap-1'>
        {categories?.map(({ _id, category }) => (
          <Button
            key={_id}
            size='sm'
            variant='ghost'
            onClick={() => handleCategoryChange(`category=${category}`)}
          >
            {category}
          </Button>
        ))}

        <Button
          className='rounded-lg'
          size='sm'
          variant='ghost'
          onClick={resetSearchAndFilter}
        >
          <RotateCw />
        </Button>
      </div>
    </div>
  )
}

export default Filtering
