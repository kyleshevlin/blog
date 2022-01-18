import React from 'react'
import { bs } from '../shevy'

const SHADOW_SIZE = 3
const toPx = n => `${n}px`
export const shadowSize = (n = 1) => toPx(SHADOW_SIZE * n)

const SHADOWS = [
  `${shadowSize()} ${shadowSize()} var(--colors-background)`,
  `${shadowSize(2)} ${shadowSize(2)} var(--components-button-shadow-color)`,
]

export const buttonStyles = {
  backgroundColor: 'var(--components-button-background)',
  boxShadow: SHADOWS.join(', '),
  border: 'none',
  color: 'var(--components-button-text)',
  display: 'inline-block',
  fontFamily: 'var(--fonts-catamaran)',
  fontSize: '0.85rem',
  lineHeight: 1,
  padding: `${bs(0.25)} ${bs(0.5)} ${bs(0.35)}`,
  textAlign: 'center',
  transition: 'background-color .2s ease, transform .1s ease',

  '&:active': {
    boxShadow: '0px 0px var(--colors-background)',
    transform: `translate(${shadowSize()}, ${shadowSize()})`,
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
