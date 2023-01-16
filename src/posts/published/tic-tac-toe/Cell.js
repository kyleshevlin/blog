import React from 'react'

const cellStyle = {
  backgroundColor: 'var(--colors-offset)',
  height: 75,
  width: 75,
}

export function FirstCell({ cell }) {
  return <div css={cellStyle}>{cell}</div>
}

const buttonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  fontFamily: 'var(--fonts-secondary)',
  fontSize: '2em',
  height: '100%',
  width: '100%',

  '&:hover': {
    outline: '2px solid var(--colors-accent)',
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
