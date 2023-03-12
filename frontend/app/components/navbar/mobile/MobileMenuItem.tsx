'use client'

import { Menu } from '@headlessui/react'
import { ReactNode } from 'react'

const MobileMenuItem = ({
  children,
  href,
  onClick,
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
}) => (
  <Menu.Item
    as="a"
    href={href}
    onClick={onClick}
    className="text-normal col-span-1 flex items-center justify-center font-bold leading-10 text-stone-300 transition-all duration-150 ui-selected:text-purple-300 ui-active:text-xl ui-active:text-green-300 sm:border-t-4 sm:border-l-4 sm:text-2xl"
  >
    {children}
  </Menu.Item>
)

export default MobileMenuItem
