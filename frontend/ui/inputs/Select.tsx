'use client'

import { ChangeEventHandler, ReactNode } from 'react'

const Select = ({
  children,
  onChange,
  value,
}: {
  children: ReactNode
  onChange: ChangeEventHandler<HTMLSelectElement>
  value: number | undefined
}) => (
  <select
    value={value}
    onChange={onChange}
    className="m-2 border-4 border-stone-900 bg-violet-300 p-2 font-bold shadow-normal shadow-stone-900"
  >
    {children}
  </select>
)

export default Select
