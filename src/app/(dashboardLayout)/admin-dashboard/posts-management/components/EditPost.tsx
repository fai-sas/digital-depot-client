'use client'

import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/divider'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import { useGetSinglePost, useUpdatePost } from '@/src/hooks/post.hook'
import FormInput from '@/src/components/form/FormInput'
import FormSelect from '@/src/components/form/FormSelect'
import { ImageUploader } from '@/src/components/ImageUploader'
import { useUser } from '@/src/context/user.provider'
import 'react-quill/dist/quill.snow.css'

// Dynamically import ReactQuill to handle SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function EditPost({ postId }: { postId: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const redirect = searchParams.get('redirect')

  const [description, setDescription] = useState('')

  const { data } = useGetSinglePost(postId)
  const post = data?.data

  const { user } = useUser()

  const {
    mutate: handleUpdatePost,
    isPending: updatePostPending,
    isSuccess: updatePostSuccess,
  } = useUpdatePost()

  const categoryOptions = [
    { key: 'Web', label: 'Web' },
    { key: 'Software Engineering', label: 'Software Engineering' },
    { key: 'AI', label: 'AI' },
    { key: 'Data Science', label: 'Data Science' },
  ]

  const methods = useForm({
    defaultValues: {
      title: '',
      description: '',
      images: [],
      category: '',
    },
  })

  const { handleSubmit, reset, setValue } = methods

  // Effect to reset form values when the post data is loaded
  useEffect(() => {
    if (post) {
      reset({
        title: post?.title || '',
        description: post?.description || '',
        images: post?.images || [],
        category: post?.category || '',
      })
      setDescription(post?.description || '')
    }
  }, [post, reset])

  const onSubmit: SubmitHandler<FieldValues> = (postData) => {
    postData.description = description
    postData.postedBy = user?._id

    handleUpdatePost({
      postId,
      postData,
    })
  }

  useEffect(() => {
    if (!updatePostPending && updatePostSuccess) {
      if (redirect) {
        router.push(redirect)
      } else {
        router.push('/dashboard/my-post')
      }
    }
  }, [updatePostPending, updatePostSuccess])

  return (
    <>
      <h1 className='p-8 text-2xl font-bold '>Update Post</h1>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title Input */}
            <div className='flex flex-wrap gap-2 py-2'>
              <div className='flex-1 min-w-fit'>
                <FormInput label='Title' name='title' />
              </div>
            </div>

            {/* Rich Text Editor for Description */}
            <div className='flex flex-wrap gap-2 py-2'>
              <div className='flex-1 min-w-fit'>
                <p className='py-2'>Description</p>
                <ReactQuill value={description} onChange={setDescription} />
              </div>
            </div>

            {/* Category Select */}
            <div className='flex flex-wrap gap-2 py-2'>
              <div className='flex-1 min-w-fit'>
                <FormSelect
                  label='Category'
                  name='category'
                  options={categoryOptions}
                />
              </div>
            </div>

            {/* Image Uploader */}
            <div className='flex flex-wrap gap-2 py-2'>
              <div className='flex-1 min-w-fit'>
                <ImageUploader name='images' />
              </div>
            </div>

            <Divider className='my-5' />

            {/* Submit Button */}
            <div className='flex justify-end'>
              <Button disabled={updatePostPending} size='lg' type='submit'>
                Update Post
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}
