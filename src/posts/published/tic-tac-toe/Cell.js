import React from 'react'
import { v } from '../../../utils'

const cellStyle = {
  backgroundColor: v('colors-offset'),
  height: 75,
  width: 75,
}

export function FirstCell({ cell }) {
  return <div css={cellStyle}>{cell}</div>
}

const buttonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  fontFamily: v('fonts-catamaran'),
  fontSize: '2em',
  height: '100%',
  width: '100%',

  '&:hover': {
    outline: `2px solid ${v('colors-accent')}`,
  },
}

export function ButtonCell({ cell, handleClick }) {
  return (
    <div css={cellStyle}>
      <button onClick={handleClick} css={buttonStyle} type="button">
        {cell}
      </button>
    </div>
  )
}
