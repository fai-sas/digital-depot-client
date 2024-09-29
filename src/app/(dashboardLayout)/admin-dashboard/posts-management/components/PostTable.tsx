'use client'

import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Chip,
  Button,
} from '@nextui-org/react'
import { DeleteIcon, EditIcon, EyeIcon } from 'lucide-react'
import { useDeletePost, useGetAllPosts } from '@/src/hooks/post.hook'
import Link from 'next/link'

const columns = [
  { name: 'Post Details', uid: 'postDetails' },
  { name: 'Total Votes', uid: 'totalVotes' },
  { name: 'Author', uid: 'author' },
  { name: 'ACTIONS', uid: 'actions' },
]

export default function AllPosts() {
  const { data, isLoading, isError } = useGetAllPosts()
  const posts = data?.data || []

  const { mutate: deletePost, isPending: deletePending } = useDeletePost()

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading posts data</div>

  // Function to render individual cells based on column key
  const renderCell = (post, columnKey) => {
    const deletePostHandler = () => {
      deletePost(post?._id)
    }

    switch (columnKey) {
      case 'postDetails':
        return (
          <User
            avatarProps={{ radius: 'lg', src: post.images[0] }}
            description={post.category} // Displaying category as description
            name={post.title} // Post title
          />
        )
      case 'totalVotes':
        return post.totalVotes
      case 'author':
        return (
          <User
            avatarProps={{ radius: 'lg', src: post.postedBy?.profilePhoto }}
            description={post.postedBy?.email}
            name={post.postedBy?.name}
          />
        )
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Link href={`/posts/${post?._id}`}>
              <Tooltip content='Details'>
                <span className='text-lg cursor-pointer text-default-400 active:opacity-50'>
                  <EyeIcon />
                </span>
              </Tooltip>
            </Link>
            <Link href={`/posts/update/${post?._id}`}>
              <Tooltip content='Edit post'>
                <span className='text-lg cursor-pointer text-default-400 active:opacity-50'>
                  <EditIcon />
                </span>
              </Tooltip>
            </Link>
            <Tooltip color='danger' content='Delete post'>
              <Button
                isIconOnly
                isDisabled={deletePending}
                onClick={deletePostHandler}
              >
                <span className='text-lg cursor-pointer text-danger active:opacity-50'>
                  <DeleteIcon />
                </span>
              </Button>
            </Tooltip>
          </div>
        )
      default:
        return post[columnKey] // fallback for any other column data
    }
  }

  return (
    <Table aria-label='Post Data Table'>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {posts?.map((post) => (
          <TableRow key={post._id}>
            {columns.map((column) => (
              <TableCell key={column.uid}>
                {renderCell(post, column.uid)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
