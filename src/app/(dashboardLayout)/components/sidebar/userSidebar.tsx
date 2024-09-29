import { Car, Cog, DollarSign, History, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useSidebarContext } from '../../layout/layout-context'

import { Sidebar } from './sidebar.styles'
import { SidebarItem } from './sidebar-item'
import { SidebarMenu } from './sidebar-menu'
import { CollapseItems } from './collapse-items'


export const SidebarWrapper = () => {
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
            <p className='px-4 font-bold text-inherit'>APOLLO GEARS</p>
          </Link>
        </div>

        <div className='flex flex-col justify-between h-full'>
          <div className={Sidebar.Body()}>
            <SidebarItem
              href='/dashboard'
              icon={<Home />}
              isActive={pathname === '/dashboard'}
              title='Home'
            />
            <SidebarMenu title='Main Menu'>
              <SidebarItem
                href='/dashboard/rent-car'
                icon={<Car />}
                isActive={pathname === '/dashboard/rent-car'}
                title='rent-car'
              />
              <SidebarItem
                icon={<DollarSign />}
                isActive={pathname === '/dashboard/payments'}
                title='Payments'
              />
              <CollapseItems
                icon={<History />}
                items={['Banks Accounts', 'Credit Cards', 'Loans']}
                title='Rent history'
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

            <SidebarMenu title='Updates'>
              <SidebarItem
                icon={<Home />}
                isActive={pathname === '/changelog'}
                title='Changelog'
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  )
}
