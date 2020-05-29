import React from 'react'
import { bs } from '../../../shevy'

export default function ButtonsWrap({ children }) {
  return (
    <div css={{ button: { marginTop: bs(0.25), marginRight: bs(0.5) } }}>
      {children}
    </div>
  )
}
