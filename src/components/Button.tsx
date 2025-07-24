import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  type?: HTMLButtonElement['type']
  value?: string
}

export function Button({
  children,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  value,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`relative rounded bg-accent px-4 py-2 font-sans leading-none text-white shadow-md transition-all hover:bg-accent-dark active:top-[1px] disabled:bg-gray-300 ${className}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
      value={value}
      {...rest}
    >
      {children}
    </button>
  )
}
