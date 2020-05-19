import React from 'react'
import { bs } from '../../../shevy'

export default function Wrapper({ children }) {
  return (
    <div
      css={theme => ({
        backgroundColor: theme.colors.offset,
        padding: bs(),
        marginBottom: bs(),
      })}
    >
      {children}
    </div>
  )
}
