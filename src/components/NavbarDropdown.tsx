'use client'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import { usePathname, useRouter } from 'next/navigation'
import { User } from '@nextui-org/react'

import { logout } from '../services/Auth'
import { protectedRoutes } from '../utils/protectedRoutes'

import { useGetMe } from '../hooks/user.hook'
import { useUser } from '../context/user.provider'

export default function NavbarDropdown() {
  const router = useRouter()
  const pathname = usePathname()
  const { user: currentUser, setIsLoading: userLoading } = useUser()

  const handleLogout = () => {
    logout()
    userLoading(true)

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push('/')
    }
  }

  const handleNavigation = (pathname: string) => {
    router.push(pathname)
  }

  const adminItems = [
    <DropdownItem
      key='admin-dashboard'
      onClick={() => handleNavigation('/admin-dashboard')}
    >
      Dashboard
    </DropdownItem>,
    <DropdownItem
      key='posts-management'
      onClick={() => handleNavigation('/admin-dashboard/posts-management')}
    >
      Post Management
    </DropdownItem>,
    <DropdownItem
      key='user-management'
      onClick={() => handleNavigation('/admin-dashboard/user-management')}
    >
      Manage Users
    </DropdownItem>,
    <DropdownItem
      key='activity-log'
      onClick={() => handleNavigation('/admin-dashboard/activity-log')}
    >
      Activity Log
    </DropdownItem>,
  ]

  const userItems = [
    <DropdownItem
      key='dashboard'
      onClick={() => handleNavigation('/dashboard')}
    >
      Dashboard
    </DropdownItem>,
    <DropdownItem
      key='my-posts'
      onClick={() => handleNavigation('/dashboard/my-post')}
    >
      My Posts
    </DropdownItem>,
    <DropdownItem
      key='follow-details'
      onClick={() => handleNavigation('/dashboard/follow-details')}
    >
      Follow Details
    </DropdownItem>,
    <DropdownItem
      key='my-profile'
      onClick={() => handleNavigation('/dashboard/my-profile')}
    >
      My Profile
    </DropdownItem>,
  ]

  if (currentUser) {
    return (
      <Dropdown>
        <DropdownTrigger>
          <User
            avatarProps={{
              src: currentUser?.profilePhoto || '/default-avatar.png',
            }}
            isFocusable={true}
            name={currentUser?.name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='Static Actions'>
          {currentUser?.role === 'ADMIN' && adminItems}
          {currentUser?.role === 'USER' && userItems}
          <DropdownItem
            key='delete'
            className='text-danger'
            color='danger'
            onClick={handleLogout}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }

  return null
}
