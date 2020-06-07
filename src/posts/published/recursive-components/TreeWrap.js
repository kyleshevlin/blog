import React from 'react'
import { bs } from '../../../shevy'
import { v } from '../../../utils'

export default function TreeWrap({ children }) {
  return (
    <div
      style={{
        backgroundColor: v('colors-offset'),
        padding: bs(),
        marginBottom: bs(1.5),
        marginTop: bs(1.5),
      }}
    >
      {children}
    </div>
  )
}
