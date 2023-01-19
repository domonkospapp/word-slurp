'use client'
import React, { ReactNode } from 'react'

const Button = ({
  children,
  onClick,
  color,
}: {
  children: ReactNode
  onClick: () => void
  color: string
}) => (
  <button
    className={`m-2 border-4 border-stone-900 ${color} p-2 font-bold shadow-normal shadow-stone-900`}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button
