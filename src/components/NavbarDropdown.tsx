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

import { useUser } from '@/src/context/user.provider'

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
          {currentUser?.role === 'ADMIN' && (
            <DropdownItem onClick={() => handleNavigation('/admin-dashboard')}>
              Dashboard
            </DropdownItem>
          )}

          {currentUser?.role === 'USER' && (
            <DropdownItem onClick={() => handleNavigation('/dashboard')}>
              Dashboard
            </DropdownItem>
          )}

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
