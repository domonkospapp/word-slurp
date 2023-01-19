'use client'

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
    href: '/words/import',
    text: 'IMPORT',
  },
]

const Navbar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  const toggleMenu = () => setMenuIsOpen((menuIsOpen) => !menuIsOpen)

  return (
    <header>
      <nav>
        <div className="hidden grid-cols-4 sm:grid">
          {menu.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
          <NavButton />
        </div>
        <div className="grid grid-cols-2 bg-stone-200 sm:hidden">
          <div className="col-span-1 flex items-center justify-center border-b-4 border-r-4 border-stone-900  p-3.5 text-center text-4xl font-bold transition-all duration-150 sm:text-2xl">
            Words
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
            <NavButton />
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
