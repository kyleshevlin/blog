import React from 'react'
import { Flex, FlexItem, Margin } from '@kyleshevlin/layout'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import Container from './Container'
import { bs } from '../shevy'
import Github from './icons/Github'
import Twitter from './icons/Twitter'
import Contributors from './Contributors'
import { formatLength } from '../utils/length'
import { CONTENT_WIDTH } from '../constants'
import Mastodon from './icons/Mastodon'
import { Link } from 'gatsby'

const links = [
  { href: 'https://twitter.com/kyleshevlin', icon: Twitter, title: 'Twitter' },
  { href: 'https://github.com/kyleshevlin', icon: Github, title: 'Github' },
  {
    href: 'https://mastodon.social/@kyleshevlin',
    icon: Mastodon,
    rel: 'me',
    title: 'Mastodon',
  },
]

const additionalLinks = [
  { to: '/newsletter', text: 'Newsletter' },
  { to: '/contact', text: 'Contact' },
  { to: '/raw', text: 'Raw' },
]

export default function Footer() {
  return (
    <footer
      css={{
        backgroundColor: 'var(--components-footer-background)',
        color: 'var(--components-footer-text)',
        fontFamily: 'var(--fonts-secondary)',
        paddingTop: bs(2),
        paddingBottom: bs(2),
        textAlign: 'center',
      }}
    >
      <Container>
        <Margin bottom={2}>
          <div
            css={{
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: formatLength(CONTENT_WIDTH),
            }}
          >
            <Contributors />
          </div>
        </Margin>

        <Margin vertical={2}>
          <Flex direction="column" gap={0.5}>
            <div>Additional Links</div>

            <Flex justify="center" gap={2} wrap="wrap">
              {additionalLinks.map(({ to, text }) => (
                <FlexItem basis={125} key={to}>
                  <Link to={to}>{text}</Link>
                </FlexItem>
              ))}
            </Flex>
          </Flex>
        </Margin>

        <Margin bottom={0.5}>
          <Flex align="center" justify="center">
            {links.map(({ href, icon: Icon, rel, title }) => (
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
                rel={rel}
                title={title}
              >
                <Icon
                  antiFill={'var(--components-footer-background)'}
                  fill={'var(--components-button-background)'}
                  width={30}
                />
              </OutboundLink>
            ))}
          </Flex>
        </Margin>

        <div>
          &copy;{new Date().getFullYear()} Kyle Shevlin. All Rights Reserved.
        </div>
      </Container>
    </footer>
  )
}
