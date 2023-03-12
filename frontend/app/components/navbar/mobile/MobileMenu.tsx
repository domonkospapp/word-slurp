'use client'

import { Menu } from '@headlessui/react'
import { signIn, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { menu } from '../Navbar'
import MobileMenuItem from './MobileMenuItem'

const MobileMenu = ({ loggedIn }: { loggedIn: boolean }) => (
  <div className="grid grid-cols-2 bg-stone-200 sm:hidden">
    <PageTitle />
    <Menu>
      <Menu.Button className="col-span-1 flex cursor-pointer items-center justify-center border-b-4 border-stone-900 p-8 text-center text-2xl font-bold transition-all duration-150 hover:bg-stone-200">
        &#9776;
      </Menu.Button>
      <Menu.Items className="absolute right-0 z-40 grid w-1/2 grid-rows-5 bg-stone-900 py-6 text-center sm:hidden">
        <CloseMenuButton />
        <AllMenuButtons />
        <LoginLogoutButton loggedIn={loggedIn} />
      </Menu.Items>
    </Menu>
  </div>
)

const PageTitle = () => {
  const path = usePathname()

  const pageTitle =
    path && path == '/'
      ? 'LEARN'
      : (path &&
          menu.find((m) => m.href != '/' && path.includes(m.href))?.text) ||
        '-'
  return (
    <div className="col-span-1 flex items-center justify-center border-b-4 border-r-4 border-stone-900  p-3.5 text-center text-4xl font-bold transition-all duration-150 sm:text-2xl">
      {pageTitle}
    </div>
  )
}

const CloseMenuButton = () => (
  <MobileMenuItem href={undefined}>
    <button className="text-2xl text-red-500 ui-active:text-3xl">
      &#10006;
    </button>
  </MobileMenuItem>
)

const AllMenuButtons = () => {
  return (
    <>
      {menu.map((item) => (
        <MobileMenuItem key={item.href} href={item.href}>
          {item.text}
        </MobileMenuItem>
      ))}
    </>
  )
}

const LoginLogoutButton = ({ loggedIn }: { loggedIn: boolean }) => {
  return (
    <MobileMenuItem
      href={undefined}
      onClick={() => (loggedIn ? signOut() : signIn('google'))}
    >
      <button className="ui-active:text-red-500">
        {loggedIn ? 'LOGOUT' : 'LOGIN'}
      </button>
    </MobileMenuItem>
  )
}

export default MobileMenu
