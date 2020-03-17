import React from 'react'
import { useTheme } from 'emotion-theming'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { bs } from '../shevy'
import Container from './Container'

export default function NewsletterCTA() {
  const theme = useTheme()

  return (
    <div
      css={{
        backgroundColor: theme.colors.accent,
        color: theme.colors.background,
        paddingTop: bs(2),
        paddingBottom: bs(2),
        textAlign: 'center'
      }}
    >
      <Container>
        <div>
          <h3>Sign Up for my Newsletter!</h3>
          <p>
            Subscribers get advanced updates on things like blog posts, courses,
            apps, podcasts and other material that I create. I think you might
            like it.
          </p>

          <div css={{ textAlign: 'center' }}>
            <OutboundLink
              css={{
                display: 'inline-block',
                backgroundColor: theme.colors.offset,
                color: theme.colors.accent,
                fontFamily: theme.fonts.catamaran,
                fontSize: '1.25em',
                textTransform: 'uppercase',
                lineHeight: 1,
                padding: `${bs(0.5)} ${bs(0.75)}`,
                border: 'none',
                borderRadius: '4px',
                transition: 'all 0.3s ease',

                '&:hover': {
                  backgroundColor: theme.colors.background,
                  color: theme.colors.accent,
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
      </Container>
    </div>
  )
}
