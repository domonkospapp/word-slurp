'use client'
import React, { ReactNode } from 'react'

const Button = ({
  children,
  onClick,
  color,
  disabled,
}: {
  children: ReactNode
  onClick: () => void
  color: string
  disabled?: boolean
}) => (
  <button
    className={`m-2 border-4 border-stone-900 ${color} p-2 font-bold shadow-normal shadow-stone-900`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
)

export default Button
