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
  border: 'none',
  borderRadius: '2px',
  textAlign: 'center',
  transition: 'background-color 0.3s ease',

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

  '&:active': {
    backgroundColor: 'var(--components-button-active-background)',
    color: 'var(--components-button-active-text)',
  },
}

export default function Button({
  children,
  disabled = false,
  onClick,
  style = {},
  type = 'button',
}) {
  return (
    <button
      css={{ ...buttonStyles, ...style }}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
