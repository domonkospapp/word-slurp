'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import HamburgerMenuIcon from './HamburgerMenuIcon'
import NavButton from './NavButton'
import { NavItem } from './NavItem'

const menu: Array<NavItem> = [
  {
    href: '/words',
    text: 'WORDS',
  },
  {
    href: '/learning',
    text: 'LEARNING',
  },
  {
    href: '/import',
    text: 'IMPORT',
  },
]

const Navbar = ({ loggedIn }: { loggedIn: boolean }) => {
  const path = usePathname()

  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  const toggleMenu = () => setMenuIsOpen((menuIsOpen) => !menuIsOpen)

  const pageTitle =
    path && path == '/'
      ? 'HOME'
      : (path && menu.find((m) => path.includes(m.href))?.text) || '-'

  return (
    <header>
      <nav>
        <div className="hidden grid-cols-4 sm:grid">
          {menu.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
          <NavButton loggedIn={loggedIn} />
        </div>
        <div className="grid grid-cols-2 bg-stone-200 sm:hidden">
          <div className="col-span-1 flex items-center justify-center border-b-4 border-r-4 border-stone-900  p-3.5 text-center text-4xl font-bold transition-all duration-150 sm:text-2xl">
            {pageTitle}
          </div>
          <button
            type="button"
            aria-label="Open menu"
            onClick={toggleMenu}
            className="col-span-1 flex cursor-pointer items-center justify-center border-b-4 border-stone-900 p-8 text-center text-xl font-bold transition-all duration-150 hover:bg-stone-200"
          >
            <HamburgerMenuIcon />
          </button>
        </div>
        {menuIsOpen && (
          <div className="absolute right-0 z-10 grid grid-rows-4 bg-stone-900 sm:hidden">
            {menu.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
            <NavButton loggedIn={loggedIn} />
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
