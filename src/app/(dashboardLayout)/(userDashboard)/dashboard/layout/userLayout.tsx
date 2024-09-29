'use client'

import { NavbarWrapper } from '../../../components/dashboardNavbar/dashboardNavbar'
import { SidebarWrapper } from '../../../components/sidebar/userSidebar'

interface Props {
  children: React.ReactNode
}

export const UserLayout = ({ children }: Props) => {
  return (
    <section className='flex'>
      <SidebarWrapper />

      <NavbarWrapper>{children}</NavbarWrapper>
    </section>
  )
}
