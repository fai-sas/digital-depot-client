'use client'

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar'
import { Kbd } from '@nextui-org/kbd'
import { Link } from '@nextui-org/link'
import { Input } from '@nextui-org/input'
import { link as linkStyles } from '@nextui-org/theme'
import NextLink from 'next/link'
import clsx from 'clsx'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'

import { useUser } from '../context/user.provider'

import NavbarDropdown from './NavbarDropdown'

import { siteConfig } from '@/src/config/site'
import { ThemeSwitch } from '@/src/components/theme-switch'
import { SearchIcon, Logo } from '@/src/components/icons'


export const Navbar = () => {
  const router = useRouter()
  const { user } = useUser()

  const searchInput = (
    <Input
      aria-label='Search'
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-sm',
      }}
      endContent={
        <Kbd className='hidden lg:inline-block' keys={['command']}>
          K
        </Kbd>
      }
      labelPlacement='outside'
      placeholder='Search...'
      startContent={
        <SearchIcon className='flex-shrink-0 text-base pointer-events-none text-default-400' />
      }
      type='search'
    />
  )

  return (
    <NextUINavbar maxWidth='xl' position='sticky'>
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarBrand as='li' className='gap-3 max-w-fit'>
          <NextLink className='flex items-center justify-start gap-1' href='/'>
            <Logo />
            <p className='font-bold text-inherit'>DIY</p>
          </NextLink>
        </NavbarBrand>
        <ul className='justify-start hidden gap-4 ml-2 lg:flex'>
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium'
                )}
                color='foreground'
                href={item.href}
              >
                {item.label}
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

      <NavbarMenu>
        {searchInput}
        <div className='flex flex-col gap-2 mx-4 mt-2'>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                href='#'
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
