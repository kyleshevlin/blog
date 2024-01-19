import React from 'react'

const cellStyle = {
  backgroundColor: 'var(--colors-offset)',
  height: 75,
  width: 75,
}

export function FirstCell({ children }) {
  return (
    <div className="h-[75px] w-[75px] bg-gray-100 dark:bg-gray-800">
      {children}
    </div>
  )
}

export function ButtonCell({ cell, handleClick }) {
  return (
    <div className="h-[75px] w-[75px] bg-gray-100 dark:bg-gray-800">
      <button
        className="h-full w-full bg-transparent font-sans text-2xl"
        onClick={handleClick}
        type="button"
      >
        {cell}
      </button>
    </div>
  )
}
