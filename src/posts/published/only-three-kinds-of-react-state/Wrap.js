import React from 'react'
import { bs } from '../../../shevy'

export default function CounterWrap({ children }) {
  return (
    <div
      css={theme => ({
        backgroundColor: theme.colors.offset,
        marginBottom: bs(),
        padding: bs(),
      })}
    >
      {children}
    </div>
  )
}
