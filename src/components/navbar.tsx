'use client'

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { link as linkStyles } from '@nextui-org/theme'
import NextLink from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

import { useUser } from '../context/user.provider'

import NavbarDropdown from './NavbarDropdown'

import { siteConfig } from '@/src/config/site'
import { ThemeSwitch } from '@/src/components/theme-switch'

export const Navbar = () => {
  const router = useRouter()
  const { user } = useUser()

  // Default public or shared menu items can be added here
  const sharedMenuItems = siteConfig?.navMenuItems || []

  // Select the appropriate nav menu items based on the user's role
  let roleBasedMenuItems = siteConfig.navMenuItems.public

  if (user?.role === 'ADMIN') {
    roleBasedMenuItems = [
      ...roleBasedMenuItems,
      ...siteConfig.navMenuItems.admin,
    ]
  } else if (user?.role === 'USER') {
    roleBasedMenuItems = [
      ...roleBasedMenuItems,
      ...siteConfig.navMenuItems.user,
    ]
  }

  return (
    <NextUINavbar maxWidth='xl' position='sticky'>
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        {/* <NavbarBrand as='li' className='gap-3 max-w-fit'>
          <NextLink className='flex items-center justify-start gap-1' href='/'>
            <Logo />
            <p className='font-bold text-inherit'>DIY</p>
          </NextLink>
        </NavbarBrand> */}
        <ul className='justify-start hidden gap-4 ml-2 lg:flex'>
          {siteConfig?.navItems?.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium'
                )}
                color='foreground'
                href={item?.href}
              >
                {item?.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className='hidden sm:flex basis-1/5 sm:basis-full'
        justify='end'
      >
        {user?.email ? (
          <NavbarItem className='hidden gap-2 sm:flex'>
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem className='hidden gap-2 sm:flex'>
            <Button onClick={() => router.push('/login')}>Login</Button>
          </NavbarItem>
        )}
        <NavbarItem className='hidden gap-2 sm:flex'>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className='pl-4 sm:hidden basis-1' justify='end'>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* <NavbarMenu>
        <div className='flex flex-col gap-2 mx-4 mt-2'>
          {siteConfig.navMenuItems?.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems?.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                href={item?.href}
                size='lg'
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu> */}

      <NavbarMenu>
        <div className='flex flex-col gap-2 mx-4 mt-2'>
          {roleBasedMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === roleBasedMenuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                href={item.href}
                size='lg'
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  )
}
