'use client'

import { ChangeEventHandler, KeyboardEventHandler } from 'react'

const Input = ({
  onChange,
  value,
  onKeyDown,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}) => (
  <div className="inline-block w-full p-2">
    <input
      className="w-full border-4 border-stone-900 bg-stone-200 p-2 text-stone-900 placeholder-stone-600 shadow-normal shadow-pink-200"
      type="text"
      placeholder="Type in..."
      onChange={onChange}
      value={value}
      onKeyDown={onKeyDown}
    />
  </div>
)

export default Input
