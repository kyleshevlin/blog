import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import Container from './Container'
import { bs } from '../shevy'
import Github from './icons/Github'
import LinkedIn from './icons/LinkedIn'
import Twitch from './icons/Twitch'
import Twitter from './icons/Twitter'
import Contributors from './Contributors'
import Spacer from './Spacer'
import { formatLength } from '../utils/length'
import { CONTENT_WIDTH } from '../constants'
import Flex from './Flex'

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
    <footer
      css={{
        backgroundColor: 'var(--components-footer-background)',
        color: 'var(--components-footer-text)',
        paddingTop: bs(2),
        paddingBottom: bs(2),
        textAlign: 'center',
      }}
    >
      <Container>
        <Spacer bottom={2}>
          <div
            css={{
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: formatLength(CONTENT_WIDTH),
            }}
          >
            <Contributors />
          </div>
        </Spacer>

        <Spacer bottom={0.5}>
          <Flex align="center" justify="center">
            {links.map(({ href, icon: Icon, title }) => (
              <OutboundLink
                css={{
                  display: 'inline-block',
                  padding: `${bs(0.25)} ${bs(0.5)}`,
                  '&:hover svg': {
                    fill: 'var(--components-button-hover-background)',
                  },
                  svg: {
                    transition: 'fill 0.3s ease',
                  },
                }}
                key={title}
                href={href}
                title={title}
              >
                <Icon fill={'var(--components-button-background)'} width={30} />
              </OutboundLink>
            ))}
          </Flex>
        </Spacer>

        <div>
          &copy;{new Date().getFullYear()} Kyle Shevlin. All Rights Reserved.
        </div>
      </Container>
    </footer>
  )
}
