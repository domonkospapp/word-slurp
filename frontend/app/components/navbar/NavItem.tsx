'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NavItem = ({ item }: { item: NavItem }) => {
  const path = usePathname()
  const isActive = path === item.href

  return (
    <Link
      className={`${
        isActive
          ? 'bg-stone-900 sm:text-stone-300 hover:sm:text-stone-300'
          : 'sm:text-stone-900 sm:hover:bg-stone-200 hover:sm:text-stone-900'
      } text-normal col-span-1 flex items-center justify-center border-b-4 border-l-4 border-stone-900 p-3.5 pr-20 pl-20 text-center font-bold leading-10 text-stone-300 transition-all duration-150 hover:text-stone-100 sm:border-t-4 sm:border-l-4 sm:text-2xl`}
      href={item.href}
      prefetch={false}
    >
      {item.text}
    </Link>
  )
}

export interface NavItem {
  href: string
  text: string
}
