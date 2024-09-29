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
  Chip,
  Tooltip,
  ChipProps,
} from '@nextui-org/react'
import { DeleteIcon, EditIcon, EyeIcon } from 'lucide-react'
import { useGetAllUsers } from '@/src/hooks/user.hook'

const columns = [
  { name: 'NAME', uid: 'name' },
  { name: 'ROLE', uid: 'role' },
  { name: 'STATUS', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' },
]

const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
}

export default function AllUsers() {
  const { data, isLoading, isError } = useGetAllUsers() // Fetching data from the API
  const users = data?.data || []

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading users data</div>

  // Function to render individual cells based on column key
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: user?.profilePhoto }}
            description={user?.email}
            name={cellValue}
          />
        )
      case 'role':
        return (
          <div className='flex flex-col'>
            <p className='text-sm capitalize text-bold'>{cellValue}</p>
            <p className='text-sm capitalize text-bold text-default-400'>
              {user?.team}
            </p>
          </div>
        )
      case 'status':
        return (
          <Chip
            className='capitalize'
            color={statusColorMap[user.status.toLowerCase()]} // Handle status color
            size='sm'
            variant='flat'
          >
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip content='Details'>
              <span className='text-lg cursor-pointer text-default-400 active:opacity-50'>
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content='Edit user'>
              <span className='text-lg cursor-pointer text-default-400 active:opacity-50'>
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color='danger' content='Delete user'>
              <span className='text-lg cursor-pointer text-danger active:opacity-50'>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }

  return (
    <Table aria-label='User Data Table'>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column?.uid}
            align={column?.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user?.id}>
            {columns.map((column) => (
              <TableCell key={column?.uid}>
                {renderCell(user, column?.uid)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
