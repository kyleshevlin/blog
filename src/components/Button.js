import React from 'react'
import { bs } from '../shevy'

export const buttonStyles = {
  display: 'inline-block',
  backgroundColor: 'var(--components-button-background)',
  color: 'var(--components-button-text)',
  fontFamily: 'var(--fonts-catamaran)',
  fontSize: '0.85rem',
  lineHeight: 1,
  padding: `${bs(0.25)} ${bs(0.5)} ${bs(0.35)}`,
  position: 'relative',
  border: 'none',
  borderRadius: '2px',
  textAlign: 'center',
  transition: 'all 0.3s ease',

  '&:active': {
    top: '1px',
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
