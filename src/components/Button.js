import React from 'react'
import { lighten } from 'polished'
import { bs } from '../shevy'

export const buttonStyles = theme => {
  const {
    components: { button },
  } = theme

  return {
    display: 'inline-block',
    backgroundColor: button.background,
    color: button.text,
    fontFamily: theme.fonts.catamaran,
    fontSize: '0.85rem',
    lineHeight: 1,
    padding: `${bs(0.25)} ${bs(0.5)} ${bs(0.35)}`,
    border: 'none',
    borderRadius: '2px',
    transition: 'background-color 0.3s ease',

    '&:hover': {
      backgroundColor: lighten(0.1, button.background),
      color: button.text,
    },
  }
}

export default function Button({ children, onClick }) {
  return (
    <button css={buttonStyles} type="button" onClick={onClick}>
      {children}
    </button>
  )
}
