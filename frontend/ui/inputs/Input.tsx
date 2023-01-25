'use client'

import { ChangeEventHandler, KeyboardEventHandler } from 'react'

const Input = ({
  fullWidth,
  onChange,
  value,
  onKeyDown,
}: {
  fullWidth?: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}) => (
  <input
    className={`m-2  ${
      fullWidth ? ' w-full' : ''
    } border-4 border-stone-900 bg-stone-200 p-2 text-stone-900 placeholder-stone-600 shadow-normal shadow-pink-200`}
    type="text"
    placeholder="Type in..."
    onChange={onChange}
    value={value}
    onKeyDown={onKeyDown}
  />
)

export default Input
