'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useGetMe } from '@/src/hooks/user.hook'
import { logout } from '@/src/services/Auth'
import { usePathname, useRouter } from 'next/navigation'

export default function DashBoardDropdown() {
  const { data } = useGetMe()
  const currentUser = data?.data
  const [isOpen, setIsOpen] = useState(false) // Dropdown state
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push('/')
    }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen) // Toggle dropdown visibility
  }

  return (
    <>
      {currentUser && (
        <div className='relative inline-block text-left'>
          {/* Trigger Button */}
          <button
            onClick={toggleDropdown}
            className='flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md'
          >
            {currentUser.name}
            <img
              src={currentUser.profilePhoto || '/default-avatar.png'}
              alt='User Avatar'
              className='w-8 h-8 ml-2 rounded-full'
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className='absolute right-0 w-48 mt-2 bg-white border rounded-md shadow-lg'>
              <div className='py-1' role='menu' aria-orientation='vertical'>
                {/* Admin Routes */}
                {currentUser?.role === 'ADMIN' && (
                  <>
                    <Link href='/admin-dashboard'>Dashboard</Link>
                    <Link href='/admin-dashboard/posts-management'>
                      Post Management
                    </Link>
                    <Link href='/admin-dashboard/user-management'>
                      Manage Users
                    </Link>
                    <Link href='/admin-dashboard/activity-log'>
                      Activity Log
                    </Link>
                  </>
                )}

                {/* User Routes */}
                {currentUser?.role === 'USER' && (
                  <>
                    <Link href='/dashboard'>Dashboard</Link>
                    <Link href='/dashboard/my-post'>My Posts</Link>
                    <Link href='/dashboard/follow-details'>Follow Details</Link>
                    <Link href='/dashboard/my-profile'>My Profile</Link>
                  </>
                )}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className='block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100'
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
