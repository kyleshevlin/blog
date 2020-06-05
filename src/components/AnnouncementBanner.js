import React from 'react'
import { useTheme } from 'emotion-theming'
import Container from './Container'
import { bs } from '../shevy'
import { buttonStyles } from './Button'

function BLM() {
  const theme = useTheme()

  return (
    <div css={{ display: 'flex', alignItems: 'center' }}>
      <div>
        I unashamedly support{' '}
        <a
          css={{
            color: theme.components.announcementBanner.links.text,

            '&:hover': {
              color: theme.components.announcementBanner.links['&:hover'].text,
            },
          }}
          href="https://blacklivesmatter.com/"
        >
          <strong>#BlackLivesMatter</strong>
        </a>
        . Consider making a donation to them today.
      </div>
      <div>
        <a
          css={{
            ...buttonStyles(theme),
            marginLeft: bs(0.5),
            backgroundColor: theme.components.announcementBanner.links.text,
            color: theme.colors.accent,

            '&:hover': {
              backgroundColor:
                theme.components.announcementBanner.links['&:hover'].text,
              color: theme.colors.accent,
            },
          }}
          href="https://secure.actblue.com/donate/ms_blm_homepage_2019"
        >
          Donate Now
        </a>
      </div>
    </div>
  )
}

export default function AnnouncementBanner() {
  const theme = useTheme()

  return (
    <div
      css={{
        backgroundColor: theme.components.announcementBanner.background,
        color: theme.components.announcementBanner.text,
        fontFamily: theme.fonts.catamaran,
        paddingTop: bs(0.5),
        paddingBottom: bs(0.5),
      }}
    >
      <Container>
        <BLM />
      </Container>
    </div>
  )
}
