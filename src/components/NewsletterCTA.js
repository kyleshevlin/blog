import React from 'react'
import { useTheme } from 'emotion-theming'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { bs } from '../shevy'

export default function NewsletterCTA() {
  const theme = useTheme()
  const {
    components: { newsletterCTA: newsletterCTATheme }
  } = theme

  return (
    <div
      css={{
        backgroundColor: newsletterCTATheme.background,
        color: newsletterCTATheme.text,
        padding: bs(2),
        textAlign: 'center'
      }}
    >
      <div>
        <h3>
          Let's talk some more about JavaScript, React, and software
          engineering.
        </h3>
        <p>
          I write the occasional newsletter to share my thoughts and the new
          projects I'm working on. I would love for you to join the discussion.
          You can unsubscribe at any time.
        </p>

        <div css={{ textAlign: 'center' }}>
          <OutboundLink
            css={{
              display: 'inline-block',
              backgroundColor: newsletterCTATheme.outboundLink.background,
              color: newsletterCTATheme.outboundLink.text,
              fontFamily: theme.fonts.catamaran,
              fontSize: '1.25em',
              textTransform: 'uppercase',
              lineHeight: 1,
              padding: `${bs(0.5)} ${bs(0.75)}`,
              border: 'none',
              borderRadius: '4px',
              transition: 'all 0.3s ease',

              '&:hover': {
                backgroundColor:
                  newsletterCTATheme.outboundLink['&:hover'].background,
                color: newsletterCTATheme.outboundLink['&:hover'].text,
                transform: 'translateY(-2px)'
              },

              '&:active': {
                transform: 'translateY(0)'
              }
            }}
            href="https://buttondown.email/kyleshevlin"
          >
            <span
              css={{
                position: 'relative',
                top: '-2px'
              }}
            >
              Sign Up Now
            </span>
          </OutboundLink>
        </div>
      </div>
    </div>
  )
}
