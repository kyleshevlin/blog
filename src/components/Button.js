import React from 'react'
import { bs } from '../shevy'
import { v } from '../utils'

export const buttonStyles = {
  display: 'inline-block',
  backgroundColor: v('components-button-background'),
  color: v('components-button-text'),
  fontFamily: v('fonts-catamaran'),
  fontSize: '0.85rem',
  lineHeight: 1,
  padding: `${bs(0.25)} ${bs(0.5)} ${bs(0.35)}`,
  border: 'none',
  borderRadius: '2px',
  textAlign: 'center',
  transition: 'background-color 0.3s ease',

  '&:hover': {
    backgroundColor: v('components-button-hover-background'),
    color: v('components-button-hover-text'),
  },
}

export default function Button({ children, onClick }) {
  return (
    <button css={buttonStyles} type="button" onClick={onClick}>
      {children}
    </button>
  )
}
