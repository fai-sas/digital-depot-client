'use client'

import { Input } from '@nextui-org/input'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

import Filtering from './Filtering'

import useDebounce from '@/src/hooks/debounce.hook'

const Search = () => {
  const { register, watch, reset } = useForm()
  const searchParams = useSearchParams()
  const router = useRouter()

  const searchTerm = useDebounce(watch('searchTerm'))

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (searchTerm) {
      params.set('search', searchTerm)
    } else {
      params.delete('search')
    }
    router.push(`/posts?${params.toString()}`)
  }, [searchTerm, router, searchParams])

  const resetSearchAndFilter = () => {
    reset({ searchTerm: '' })
    router.push('/posts')
  }

  return (
    <>
      <div className='flex-1 max-w-xl pt-10 mx-auto'>
        <Input
          {...register('searchTerm')}
          aria-label='Search'
          classNames={{
            inputWrapper: 'bg-default-100',
            input: 'text-sm',
          }}
          placeholder='Search...'
          size='lg'
          startContent={
            <SearchIcon className='flex-shrink-0 text-base pointer-events-none text-default-400' />
          }
          type='text'
        />
      </div>

      <Filtering resetSearchAndFilter={resetSearchAndFilter} />
    </>
  )
}

export default Search
