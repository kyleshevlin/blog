import React from 'react'
import { useSpacing } from '@kyleshevlin/layout'

export function Card({ children }) {
  const bs = useSpacing()

  return (
    <div
      css={{
        border: '2px solid var(--colors-offsetMore)',
        borderRadius: 4,
        boxShadow: '8px 8px var(--colors-accent)',
        padding: bs(1),
        maxWidth: '50ch',
      }}
    >
      {children}
    </div>
  )
}

Card.Wrap = function Wrap({ children }) {
  return (
    <div
      style={{
        border: '2px solid var(--colors-offsetMore)',
        borderRadius: 4,
        boxShadow: '8px 8px var(--colors-accent)',
        maxWidth: '50ch',
      }}
    >
      {children}
    </div>
  )
}

Card.Section = function Section({ children }) {
  const bs = useSpacing()

  return <div style={{ padding: bs(1) }}>{children}</div>
}

Card.Divider = function Divider() {
  return (
    <hr style={{ backgroundColor: 'var(--colors-offsetMore', margin: 0 }} />
  )
}
