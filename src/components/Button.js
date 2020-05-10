import React from 'react'
import { lighten } from 'polished'
import { bs } from '../shevy'

export const buttonStyles = theme => {
  const {
    components: { themeToggle }
  } = theme

  return {
    display: 'inline-block',
    backgroundColor: themeToggle.background,
    color: themeToggle.text,
    fontFamily: theme.fonts.catamaran,
    fontSize: '0.75rem',
    paddingLeft: bs(0.5),
    paddingRight: bs(0.5),
    border: 'none',
    borderRadius: '2px',
    transition: 'background-color 0.3s ease',

    '&:hover': {
      backgroundColor: lighten(0.1, themeToggle.background),
      color: themeToggle.text
    }
  }
}

export default function Button({ children, onClick }) {
  return (
    <button css={buttonStyles} type="button" onClick={onClick}>
      {children}
    </button>
  )
}
