import React from 'react'
import Container from './Container'
import { bs } from '../shevy'
import { buttonStyles } from './Button'
import { v } from '../utils'

function BLM() {
  return (
    <div css={{ display: 'flex', alignItems: 'center' }}>
      <div>
        I unashamedly support{' '}
        <a
          css={{
            color: v('components-announcementBanner-links-text'),

            '&:hover': {
              color: v('components-announcementBanner-links-hover-text'),
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
            ...buttonStyles,
            marginLeft: bs(0.5),
            backgroundColor: v('components-announcementBanner-links-text'),
            color: v('colors-accent'),

            '&:active': {
              color: v('colors-accent'),
            },

            '&:hover': {
              backgroundColor: v(
                'components-announcementBanner-links-hover-text'
              ),
              color: v('colors-accent'),
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
  return (
    <div
      css={{
        backgroundColor: v('components-announcementBanner-background'),
        color: v('components-announcementBanner-text'),
        fontFamily: v('fonts-catamaran'),
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
