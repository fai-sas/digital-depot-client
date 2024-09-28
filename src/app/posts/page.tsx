// app/blog/create/page.tsx
'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios'

// Dynamically import ReactQuill to handle SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

const categories = ['Web', 'Software Engineering', 'AI', 'Data Science']

export default function CreateBlogPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/blog', {
        title,
        content,
        categories: selectedCategories,
        images,
      })
      alert('Blog post created successfully!')
    } catch (error) {
      console.error('Error creating post', error)
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // Upload image logic here (e.g., to a cloud storage like S3)
      const uploadedImageURLs = await uploadImagesToCloud(files)
      setImages((prev) => [...prev, ...uploadedImageURLs])
    }
  }

  return (
    <div>
      <h1>Create a New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Content:</label>
          <ReactQuill value={content} onChange={setContent} />
        </div>

        <div>
          <label>Categories:</label>
          {categories.map((category) => (
            <div key={category}>
              <input
                type='checkbox'
                id={category}
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>

        <div>
          <label>Attach Images:</label>
          <input
            type='file'
            multiple
            accept='image/*'
            onChange={handleImageUpload}
          />
        </div>

        <button type='submit'>Create Post</button>
      </form>
    </div>
  )
}

// Example function for image upload, you would need to implement this
const uploadImagesToCloud = async (files: FileList) => {
  const uploadedImageURLs: string[] = []
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    // Upload to cloud storage (e.g., AWS S3, Cloudinary, etc.) and get the URL
    const uploadedURL = `https://cloudstorage.com/${file.name}` // Placeholder URL
    uploadedImageURLs.push(uploadedURL)
  }
  return uploadedImageURLs
}
