import React from 'react'
import { bs } from '../shevy'

export default function OffsetWrap({ children }) {
  return (
    <div
      css={{
        backgroundColor: 'var(--colors-offset)',
        padding: bs(),
        marginTop: bs(1.5),
        marginBottom: bs(1.5),
      }}
    >
      {children}
    </div>
  )
}
