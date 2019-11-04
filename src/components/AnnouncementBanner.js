import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import Container from './Container'
import { COLORS, FONTS } from '../constants'
import { bs } from '../shevy'
import { inflect } from '../utils'

const WORKSHOP_DATE = new Date(2019, 10, 13)
const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24

export default function AnnouncementBanner() {
  const now = new Date()
  const daysLeft = Math.floor((WORKSHOP_DATE - now) / MILLISECONDS_IN_A_DAY)

  return daysLeft > 0 ? (
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
          <div></div>
          <div css={{ marginRight: bs(0.5) }}>
            Attend my live, online workshop about State Machines on Nov. 13th.{' '}
            <strong>
              Only {daysLeft} {inflect('day', 'days', daysLeft)} left.
            </strong>{' '}
            Get your ticket now!
          </div>
          <OutboundLink
            css={{
              backgroundColor: COLORS.lightGray,
              borderRadius: 4,
              color: COLORS.teal,
              display: 'inline-block',
              flexShrink: 0,
              fontSize: '.85rem',
              padding: `${bs(0.125)} ${bs(0.25)}`,
              transition: 'all 0.3s ease',

              '&:hover': {
                backgroundColor: COLORS.white,
                color: COLORS.teal,
                transform: 'translateY(-1px)'
              },

              '&:active': {
                transform: 'translateY(0)'
              }
            }}
            href="https://ti.to/egghead-live-online-events/introduction-to-state-machines-using-xstate-with-kyle-shevlin-2019-11-13"
          >
            Get Ticket
          </OutboundLink>
        </div>
      </Container>
    </div>
  ) : null
}
