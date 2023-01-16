import React from 'react'
import { bs } from '../shevy'

export const buttonStyles = {
  backgroundColor: 'var(--components-button-background)',
  border: 'none',
  borderRadius: bs(1 / 8),
  color: 'var(--components-button-text)',
  display: 'inline-block',
  fontFamily: 'var(--fonts-secondary)',
  fontSize: '0.85rem',
  lineHeight: 1,
  padding: `${bs(0.25)} ${bs(0.5)} ${bs(0.35)}`,
  textAlign: 'center',
  transition: 'background-color .2s ease, transform .1s ease',

  '&:active': {
    transform: 'translateY(1px)',
  },

  '&:disabled': {
    backgroundColor: 'var(--colors-offsetMore)',

    '&:hover': {
      backgroundColor: 'var(--colors-offsetMore)',
    },
  },

  '&:hover': {
    backgroundColor: 'var(--components-button-hover-background)',
    color: 'var(--components-button-hover-text)',
  },
}

export default function Button({
  children,
  disabled = false,
  onClick,
  style = {},
  type = 'button',
  ...rest
}) {
  return (
    <button
      css={{ ...buttonStyles, ...style }}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}
