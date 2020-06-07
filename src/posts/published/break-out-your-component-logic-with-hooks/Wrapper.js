import React from 'react'
import { bs } from '../../../shevy'
import { v } from '../../../utils'

export default function Wrapper({ children }) {
  return (
    <div
      css={{
        backgroundColor: v('colors-offset'),
        padding: bs(),
        marginBottom: bs(),
      }}
    >
      {children}
    </div>
  )
}
