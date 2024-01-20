import React from 'react'
import type { WithChildren } from '../../../types'

export function FirstCell({ children }: WithChildren) {
  return (
    <div className="h-[75px] w-[75px] bg-gray-100 dark:bg-gray-800">
      {children}
    </div>
  )
}

export function ButtonCell({
  cell,
  handleClick,
}: {
  cell: React.ReactNode
  handleClick: () => void
}) {
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
