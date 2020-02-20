import React from 'react'
import { COLORS } from '../../../constants'
import { bs } from '../../../shevy'

export default function TreeWrap({ children }) {
  return (
    <div
      style={{
        backgroundColor: COLORS.lightGray,
        padding: bs(),
        marginBottom: bs(1.5),
        marginTop: bs(1.5)
      }}
    >
      {children}
    </div>
  )
}
