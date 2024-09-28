'use client'

import { Button } from '@nextui-org/button'
import { CldUploadWidget } from 'next-cloudinary'
import { Image } from '@nextui-org/image'
import { useFormContext } from 'react-hook-form'

interface ImageUploaderProps {
  name: string
}

export function ImageUploader({ name }: ImageUploaderProps) {
  const { setValue, watch } = useFormContext()

  // Watch the image field to see its current value
  const images = watch(name)

  const handleUploadSuccess = (url: string) => {
    // Get the current images (could be an array or empty)
    const currentImages = watch(name) || []

    // Update the form with the new image array
    setValue(name, [...currentImages, url])
  }

  return (
    <>
      <CldUploadWidget
        options={{
          multiple: true,
          singleUploadAutoClose: true,
        }}
        signatureEndpoint='/api/sign-cloudinary-params'
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={(result) => {
          if (typeof result.info === 'object' && 'secure_url' in result.info) {
            handleUploadSuccess(result.info.secure_url)
          }
          console.log(result?.info)
        }}
      >
        {({ open }) => {
          return (
            <Button
              className='rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              type='button'
              onClick={() => open()}
            >
              Upload Image
            </Button>
          )
        }}
      </CldUploadWidget>

      {/* Display the uploaded images */}
      <div className='mt-2'>
        {images && images?.length > 0 && (
          <div className='grid grid-cols-3 gap-2'>
            {images?.map((url: string, index: number) => (
              <Image
                key={index}
                alt={`Uploaded Image ${index}`}
                className='object-cover w-full h-24 rounded-md'
                src={url}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
