import { Input, Navbar, NavbarContent } from '@nextui-org/react'
import React from 'react'
import { ChevronLeft, Menu, SearchCheck } from 'lucide-react'

import { useSidebarContext } from '../../layout/layout-context'

import { UserDropdown } from './user-dropdown'
// import { useSidebarContext } from "../../layout/layout-context";
// import { UserDropdown } from "./user-dropdown";
interface Props {
  children: React.ReactNode
}

export const NavbarWrapper = ({ children }: Props) => {
  const { collapsed, setCollapsed } = useSidebarContext()

  return (
    <div className='relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto '>
      <Navbar
        isBordered
        className='w-full'
        classNames={{
          wrapper: 'w-full max-w-full',
        }}
      >
        <NavbarContent className='md:hidden'>
          {collapsed ? (
            <ChevronLeft onClick={setCollapsed} />
          ) : (
            <Menu onClick={setCollapsed} />
          )}
        </NavbarContent>
        <NavbarContent className='w-full max-md:hidden'>
          <Input
            isClearable
            className='w-full'
            classNames={{
              input: 'w-full',
              mainWrapper: 'w-full',
            }}
            placeholder='Search...'
            startContent={<SearchCheck />}
          />
        </NavbarContent>
        <NavbarContent
          className='w-fit data-[justify=end]:flex-grow-0'
          justify='end'
        >
          <UserDropdown />
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  )
}
