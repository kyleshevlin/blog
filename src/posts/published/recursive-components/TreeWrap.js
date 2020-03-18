import React from 'react'
import { useTheme } from 'emotion-theming'
import { bs } from '../../../shevy'

export default function TreeWrap({ children }) {
  const theme = useTheme()

  return (
    <div
      style={{
        backgroundColor: theme.colors.offset,
        padding: bs(),
        marginBottom: bs(1.5),
        marginTop: bs(1.5)
      }}
    >
      {children}
    </div>
  )
}
