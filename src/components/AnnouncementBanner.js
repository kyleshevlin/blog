import React from 'react'
import { useTheme } from 'emotion-theming'
import Container from './Container'
import { bs } from '../shevy'

export default function AnnouncementBanner({ children = null }) {
  const theme = useTheme()

  return (
    <div
      css={{
        backgroundColor: theme.colors.accent,
        color: theme.colors.background,
        fontFamily: theme.fonts.catamaran,
        paddingTop: bs(0.5),
        paddingBottom: bs(0.5),
      }}
    >
      <Container>
        <div
          css={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          {children}
        </div>
      </Container>
    </div>
  )
}
