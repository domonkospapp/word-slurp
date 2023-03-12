'use client'

import DesktopMenu from './desktop/DesktopMenu'
import MobileMenu from './mobile/MobileMenu'

export interface NavItem {
  href: string
  text: string
}

export const menu: Array<NavItem> = [
  {
    href: '/',
    text: 'LEARN',
  },
  {
    href: '/words',
    text: 'WORDS',
  },
  {
    href: '/import',
    text: 'IMPORT',
  },
]

const Navbar = ({ loggedIn }: { loggedIn: boolean }) => (
  <header>
    <nav>
      <DesktopMenu loggedIn={loggedIn} />
      <MobileMenu loggedIn={loggedIn} />
    </nav>
  </header>
)

export default Navbar
