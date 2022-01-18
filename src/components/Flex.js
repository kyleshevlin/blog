import React from 'react'
import { bs } from '../shevy'

export default function Flex({
  align: alignItems,
  children,
  direction: flexDirection,
  gap,
  justify: justifyContent,
  style = {},
  wrap: flexWrap,
}) {
  gap = typeof gap === 'number' ? bs(gap) : gap

  return (
    <div
      css={{
        ...style,
        alignItems,
        display: 'flex',
        flexDirection,
        flexWrap,
        gap,
        justifyContent,
      }}
    >
      {children}
    </div>
  )
}
