import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { COLORS } from '../constants'
import { bs } from '../shevy'
import { darken } from 'polished'

const NewsletterCTA = () => (
  <div css={{ marginTop: bs(4) }}>
    <p>
      If you enjoyed reading this blog post and want more, consider{' '}
      <a href="https://buttondown.email/kyleshevlin">
        signing up for my newsletter
      </a>
      . Subscribers get advanced updates on things like blog posts, courses,
      apps, podcasts and other material that I create. Think you might like it.
    </p>

    <div css={{ textAlign: 'center' }}>
      <OutboundLink
        css={{
          display: 'inline-block',
          backgroundColor: COLORS.teal,
          color: COLORS.white,
          fontFamily: 'Catamaran, sans-serif',
          fontSize: '1.25em',
          textTransform: 'uppercase',
          lineHeight: 1,
          paddingTop: bs(0.5),
          paddingRight: bs(0.75),
          paddingBottom: bs(0.5),
          paddingLeft: bs(0.75),
          borderRadius: '4px',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: darken(0.1, COLORS.teal),
            color: COLORS.white
          }
        }}
        href="https://buttondown.email/kyleshevlin"
      >
        Sign Up Now
      </OutboundLink>
    </div>
  </div>
)

export default NewsletterCTA
