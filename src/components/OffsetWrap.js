import React from 'react'
import { useSpacing } from '@kyleshevlin/layout'

export default function OffsetWrap({ children }) {
  const bs = useSpacing()

  return (
    <div
      css={{
        backgroundColor: 'var(--colors-offset)',
        padding: bs(1),
        marginTop: bs(1.5),
        marginBottom: bs(1.5),
      }}
    >
      {children}
    </div>
  )
}
