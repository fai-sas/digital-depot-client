import { Avatar, Tooltip } from '@nextui-org/react'
import { Car, Cog, Home, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useSidebarContext } from '../../layout/layout-context'

import { CollapseItems } from './collapse-items'
import { SidebarItem } from './sidebar-item'
import { SidebarMenu } from './sidebar-menu'
import { Sidebar } from './sidebar.styles'



export const AdminSidebarWrapper = () => {
  const pathname = usePathname()
  const { collapsed } = useSidebarContext()

  return (
    <aside className='h-screen z-[20] sticky top-0'>
      {collapsed ? <div className={Sidebar.Overlay()} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          {' '}
          <Link className='flex' href='/'>
            <Cog />
            <p className='px-4 font-bold text-inherit'>Digital DIY Depot</p>
          </Link>
        </div>
        <div className='flex flex-col justify-between h-full'>
          <div className={Sidebar.Body()}>
            <SidebarItem
              href='/admin-dashboard'
              icon={<Home />}
              isActive={pathname === '/admin-dashboard'}
              title='Home'
            />
            <SidebarMenu title='Main Menu'>
              <SidebarItem
                href='/admin-dashboard/cars-management'
                icon={<Car />}
                isActive={pathname === '/admin-dashboard/cars-management'}
                title='cars manage'
              />
              <SidebarItem
                href='/admin-dashboard/users-management'
                icon={<User />}
                isActive={pathname === '/admin-dashboard/users-management'}
                title='users manage'
              />
              <CollapseItems
                icon={<Home />}
                items={['Banks Accounts', 'Credit Cards']}
                title='Balances'
              />
              <SidebarItem
                icon={<Home />}
                isActive={pathname === '/customers'}
                title='Customers'
              />
              <SidebarItem
                icon={<Home />}
                isActive={pathname === '/products'}
                title='Products'
              />
              <SidebarItem
                icon={<Home />}
                isActive={pathname === '/reports'}
                title='Reports'
              />
            </SidebarMenu>

            <SidebarMenu title='General'>
              <SidebarItem
                icon={<Home />}
                isActive={pathname === '/developers'}
                title='Developers'
              />
              <SidebarItem
                icon={<Home />}
                isActive={pathname === '/view'}
                title='View Test Data'
              />
              <SidebarItem
                icon={<Home />}
                isActive={pathname === '/settings'}
                title='Settings'
              />
            </SidebarMenu>

            <SidebarMenu title='Updates'>
              <SidebarItem
                icon={<Home />}
                isActive={pathname === '/changelog'}
                title='Changelog'
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip color='primary' content={'Settings'}>
              <div className='max-w-fit'>
                <Home />
              </div>
            </Tooltip>
            <Tooltip color='primary' content={'Adjustments'}>
              <div className='max-w-fit'>
                <Home />
              </div>
            </Tooltip>
            <Tooltip color='primary' content={'Profile'}>
              <Avatar
                size='sm'
                src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  )
}
