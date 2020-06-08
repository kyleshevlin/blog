import React from 'react'
import { bs } from '../shevy'
import { v } from '../utils'

export default function OffsetWrap({ children }) {
  return (
    <div
      css={{
        backgroundColor: v('colors-offset'),
        padding: bs(),
        marginTop: bs(1.5),
        marginBottom: bs(1.5),
      }}
    >
      {children}
    </div>
  )
}
