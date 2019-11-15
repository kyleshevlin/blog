import React from 'react'
import Container from './Container'
import { COLORS, FONTS } from '../constants'
import { bs } from '../shevy'

export default function AnnouncementBanner({ content = '' }) {
  return (
    <div
      css={{
        backgroundColor: COLORS.teal,
        color: COLORS.white,
        fontFamily: FONTS.catamaran,
        paddingTop: bs(0.5),
        paddingBottom: bs(0.5)
      }}
    >
      <Container>
        <div
          css={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          {content}
        </div>
      </Container>
    </div>
  )
}
