'use client'

import { ChangeEventHandler } from 'react'

const Input = ({
  fullWidth,
  onChange,
  value,
}: {
  fullWidth?: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string
}) => (
  <input
    className={`m-2  ${
      fullWidth ? ' w-full' : ''
    } border-4 border-stone-900 bg-stone-200 p-1 text-stone-900 placeholder-stone-600 shadow-3xl shadow-pink-200`}
    type="text"
    placeholder="Type in..."
    onChange={onChange}
    value={value}
  />
)

export default Input
