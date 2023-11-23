import React from 'react'
import { Flex, Row, useSpacing } from '@kyleshevlin/layout'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import Container from './Container'
import Github from './icons/Github'
import Twitter from './icons/Twitter'
import Contributors from './Contributors'

const links = [
  { href: 'https://twitter.com/kyleshevlin', icon: Twitter, title: 'Twitter' },
  { href: 'https://github.com/kyleshevlin', icon: Github, title: 'Github' },
]

export default function Footer() {
  const bs = useSpacing()

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
        <Flex direction="column" gap={1}>
          <Row justify="center">
            <div style={{ maxWidth: '80ch' }}>
              <Contributors />
            </div>
          </Row>

          <Flex gap={2} justify="center">
            <OutboundLink href="https://kyleshevlingolf.com">
              Looking for my golf content instead?
            </OutboundLink>
          </Flex>

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

          <div>
            &copy;{new Date().getFullYear()} Kyle Shevlin. All Rights Reserved.
          </div>
        </Flex>
      </Container>
    </footer>
  )
}
