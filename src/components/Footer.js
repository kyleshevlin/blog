import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import Container from './Container'
import { bs } from '../shevy'
import { v } from '../utils'
import Github from './icons/Github'
import LinkedIn from './icons/LinkedIn'
import Twitch from './icons/Twitch'
import Twitter from './icons/Twitter'
import Contributors from './Contributors'

const links = [
  { href: 'https://twitter.com/kyleshevlin', icon: Twitter, title: 'Twitter' },
  { href: 'https://github.com/kyleshevlin', icon: Github, title: 'Github' },
  {
    href: 'https://linkedin.com/in/kyleshevlin',
    icon: LinkedIn,
    title: 'LinkedIn',
  },
  { href: 'https://twitch.tv/kyleshevlin', icon: Twitch, title: 'Twitch' },
]

export default function Footer() {
  return (
    <div
      css={{
        backgroundColor: v('components-footer-background'),
        color: v('components-footer-text'),
        paddingTop: bs(2),
        paddingBottom: bs(2),
        textAlign: 'center',
      }}
    >
      <Container>
        <div css={{ marginBottom: bs(2) }}>
          <Contributors />
        </div>

        <div css={{ marginBottom: bs(0.5) }}>
          {links.map(({ href, icon: Icon, title }) => (
            <OutboundLink
              css={{
                display: 'inline-block',
                padding: bs(0.5),
                '&:hover svg': {
                  fill: v('components-button-hover-background'),
                },
                svg: {
                  transition: 'fill 0.3s ease',
                },
              }}
              key={title}
              href={href}
              title={title}
            >
              <Icon fill={v('components-button-background')} width={30} />
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
}
