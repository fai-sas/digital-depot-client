'use client'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import { usePathname, useRouter } from 'next/navigation'
import { Avatar } from '@nextui-org/avatar'

import { User, Link } from '@nextui-org/react'

import { useUser } from '@/src/context/user.provider'

import { logout } from '../services/Auth'
import { protectedRoutes } from '../utils/protectedRoutes'

export default function NavbarDropdown() {
  const router = useRouter()
  const pathname = usePathname()
  const { user: currentUser, setIsLoading: userLoading } = useUser()

  console.log(currentUser)

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

  if (currentUser) {
    return (
      <Dropdown>
        <DropdownTrigger>
          {/* <Avatar className='cursor-pointer' src={currentUser?.profilePhoto} /> */}
          <User
            avatarProps={{
              src: `${currentUser?.profilePhoto}`,
            }}
            isFocusable={true}
            name={currentUser?.name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='Static Actions'>
          <DropdownItem onClick={() => handleNavigation('/profile')}>
            Profile
          </DropdownItem>
          <DropdownItem onClick={() => handleNavigation('/profile/settings')}>
            Settings
          </DropdownItem>
          <DropdownItem
            onClick={() => handleNavigation('/profile/create-post')}
          >
            Create Post
          </DropdownItem>
          <DropdownItem
            key='delete'
            className='text-danger'
            color='danger'
            onClick={() => handleLogout()}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}
