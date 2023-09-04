import { useSpacing } from '@kyleshevlin/layout'
import React from 'react'

export default function ButtonsWrap({ children }) {
  const bs = useSpacing()

  return (
    <div css={{ button: { marginTop: bs(0.25), marginRight: bs(0.5) } }}>
      {children}
    </div>
  )
}
