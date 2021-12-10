import React from 'react'
import { bs } from '../shevy'

const SHADOW_SIZE = '3px'

export const buttonStyles = {
  backgroundColor: 'var(--components-button-background)',
  boxShadow: `${SHADOW_SIZE} ${SHADOW_SIZE} var(--components-button-shadow-color)`,
  border: 'none',
  borderRadius: '2px',
  color: 'var(--components-button-text)',
  display: 'inline-block',
  fontFamily: 'var(--fonts-catamaran)',
  fontSize: '0.85rem',
  lineHeight: 1,
  padding: `${bs(0.25)} ${bs(0.5)} ${bs(0.35)}`,
  position: 'relative',
  textAlign: 'center',
  transition: 'background-color .2s ease, top 0.2s ease, left .2s ease',

  '&:active': {
    boxShadow: '0px 0px var(--colors-offsetMore)',
    top: SHADOW_SIZE,
    left: SHADOW_SIZE,
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
