import React from 'react'

export default function ShiftBy({ children, x = 0, y = 0 }) {
  return <div css={{ transform: `translate(${x}px, ${y}px)` }}>{children}</div>
}
