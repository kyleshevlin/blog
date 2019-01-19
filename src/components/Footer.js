import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { lighten } from 'polished'
import Container from './Container'
import { COLORS } from '../constants'
import { bs } from '../shevy'
import Github from './icons/Github'
import LinkedIn from './icons/LinkedIn'
import Twitch from './icons/Twitch'
import Twitter from './icons/Twitter'

const links = [
  { href: 'https://twitter.com/kyleshevlin', icon: Twitter, title: 'Twitter' },
  { href: 'https://github.com/kyleshevlin', icon: Github, title: 'Github' },
  {
    href: 'https://linkedin.com/in/kyleshevlin',
    icon: LinkedIn,
    title: 'LinkedIn'
  },
  { href: 'https://twitch.tv/kyleshevlin', icon: Twitch, title: 'Twitch' }
]

const Footer = () => (
  <div
    css={{
      backgroundColor: COLORS.black,
      color: COLORS.white,
      paddingTop: bs(2),
      paddingBottom: bs(2),
      textAlign: 'center'
    }}
  >
    <Container>
      <div css={{ marginBottom: bs(0.5) }}>
        {links.map(({ href, icon: Icon, title }) => (
          <OutboundLink
            css={{
              display: 'inline-block',
              padding: bs(0.5),
              '&:hover svg': {
                fill: lighten(0.1, COLORS.teal)
              },
              svg: {
                transition: 'fill 0.3s ease'
              }
            }}
            key={title}
            href={href}
            title={title}
          >
            <Icon fill={COLORS.teal} width={30} />
          </OutboundLink>
        ))}
      </div>
      <div>
        &copy;{new Date().getFullYear()} Kyle Shevlin. All Rights Reserved.
        Built with <a href="https://www.gatsbyjs.org">Gatsby</a>.
      </div>
    </Container>
  </div>
)

export default Footer
