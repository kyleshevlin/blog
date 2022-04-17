import React from 'react'
import shevy, { bs } from '../shevy'
import BeardStrokes from './BeardStrokes'
import KofiLogo from './KofiLogo'
import LinkButton from './LinkButton'
import Share from './Share'
import ShiftBy from './ShiftBy'
import Margin from './Margin'
import { mq } from '../utils'

export default function FinishedReading({ beardStrokeKey, slug, title }) {
  return (
    <div>
      <h3 css={{ fontWeight: 'bold', marginBottom: bs(0.25) }}>
        Finished reading?
      </h3>
      <p>Here are a few options for what to do next.</p>
      <AfterOptionWrap>
        <AfterOption label="Like">
          <BeardStrokes slug={beardStrokeKey} />
        </AfterOption>
        <AfterOption label="Share">
          <Share slug={slug} title={title} />
        </AfterOption>
        <AfterOption label="Support">
          <Kofi />
        </AfterOption>
      </AfterOptionWrap>
    </div>
  )
}

function AfterOptionWrap({ children }) {
  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: bs(),
        alignItems: 'end',
      }}
    >
      {children}
    </div>
  )
}

function AfterOption({ children, label }) {
  return (
    <>
      <div
        css={{
          fontFamily: 'var(--fonts-catamaran)',
          fontSize: shevy.h4.fontSize,
          fontWeight: 'bold',
        }}
      >
        <Margin bottom={0.25}>{label}</Margin>
      </div>
      <div css={{ display: 'flex', alignItems: 'center' }}>{children}</div>
    </>
  )
}

function Kofi() {
  return (
    <div css={{ textAlign: 'center', width: '100%' }}>
      <Margin bottom={0.25}>
        <div
          css={{
            fontFamily: 'var(--fonts-catamaran)',
          }}
        >
          Was this post valuable to you? Make a donation to show&nbsp;it
        </div>
      </Margin>
      <LinkButton
        href="https://ko-fi.com/kyleshevlin"
        overrideStyles={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 56,
        }}
      >
        <span css={{ fontSize: shevy.h4.fontSize }}>Make a Donation</span>
        <div css={{ display: 'none', [mq.alpha]: { display: 'block' } }}>
          <Margin vert={0.25} left={0.5}>
            <ShiftBy y={2}>
              <KofiLogo width={40} />
            </ShiftBy>
          </Margin>
        </div>
      </LinkButton>
    </div>
  )
}
