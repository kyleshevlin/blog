import React from 'react'
import { Flex } from '@kyleshevlin/layout'
import Button from '../../../components/Button'
import { bs } from '../../../shevy'

const noop = () => {}

export function Card1() {
  return (
    <Wrap>
      <Section>
        <Flex direction="column" gap={0.5}>
          <h4 style={{ marginBottom: 0, fontWeight: 'bold' }}>Card Title</h4>
          <div>
            This is a card. It contains information and a call to action at the
            bottom.
          </div>
        </Flex>
      </Section>
      <Divider />
      <Section>
        <Button onClick={noop}>Click me</Button>
      </Section>
    </Wrap>
  )
}

export function Card2() {
  return (
    <Wrap>
      <Section>
        <Flex direction="column" gap={0.5}>
          <h4 style={{ marginBottom: 0, fontWeight: 'bold' }}>Card Title</h4>
          <div>
            This is a card. It contains information and two calls to action at
            the bottom.
          </div>
        </Flex>
      </Section>
      <Divider />
      <Section>
        <Flex gap={0.5}>
          <Button onClick={noop} style={{ flex: '1 1 auto' }}>
            Click me
          </Button>
          <Button onClick={noop} style={{ flex: '1 1 auto' }}>
            Click me, too
          </Button>
        </Flex>
      </Section>
    </Wrap>
  )
}

function Wrap({ children }) {
  return (
    <div
      css={{
        border: '2px solid var(--colors-offsetMore)',
        borderRadius: 12,
        fontFamily: 'var(--fonts-secondary)',
        maxWidth: '40ch',
      }}
    >
      {children}
    </div>
  )
}

function Section({ children }) {
  return (
    <div css={{ padding: bs(0.75) }}>
      <Flex direction="column">{children}</Flex>
    </div>
  )
}

function Divider() {
  return <div css={{ borderTop: '2px solid var(--colors-offsetMore)' }} />
}

export function CardWithChildren({ body, children, title }) {
  return (
    <Wrap>
      <Section>
        <Flex direction="column" gap={0.5}>
          <h4 style={{ marginBottom: 0, fontWeight: 'bold' }}>{title}</h4>
          <div>{body}</div>
        </Flex>
      </Section>

      {children && (
        <>
          <Divider />
          <Section>{children}</Section>
        </>
      )}
    </Wrap>
  )
}

export function CardWithSlots({ body, footer, header, title }) {
  return (
    <Wrap>
      {header && (
        <>
          <Section>{header}</Section>
          <Divider />
        </>
      )}

      <Section>
        <Flex direction="column" gap={0.5}>
          <h4 style={{ marginBottom: 0, fontWeight: 'bold' }}>{title}</h4>
          <div>{body}</div>
        </Flex>
      </Section>

      {footer && (
        <>
          <Divider />
          <Section>{footer}</Section>
        </>
      )}
    </Wrap>
  )
}
