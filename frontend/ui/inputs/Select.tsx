'use client'

import { ChangeEventHandler, ReactNode } from 'react'

const Select = ({
  children,
  onChange,
  value,
  disabled,
  fullWidth,
}: {
  children: ReactNode
  onChange: ChangeEventHandler<HTMLSelectElement>
  value: number | undefined
  disabled?: boolean
  fullWidth?: boolean
}) => (
  <select
    value={value}
    onChange={onChange}
    className={`${
      fullWidth ? ' w-full' : ''
    } m-2 border-4 border-stone-900 bg-violet-300 p-2 font-bold shadow-normal shadow-stone-900`}
    disabled={disabled}
  >
    {children}
  </select>
)

export default Select
