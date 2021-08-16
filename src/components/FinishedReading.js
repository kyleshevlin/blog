import React from 'react'
import shevy, { bs } from '../shevy'
import BeardStrokes from './BeardStrokes'
import KofiLogo from './KofiLogo'
import LinkButton from './LinkButton'
import Share from './Share'
import ShiftBy from './ShiftBy'
import Spacer from './Spacer'

export default function FinishedReading({ slug, title }) {
  return (
    <div>
      <h3 css={{ fontWeight: 'bold', marginBottom: bs(0.25) }}>
        Finished reading?
      </h3>
      <p>Here are a few options for what to do next.</p>
      <AfterOptionWrap>
        <AfterOption label="Like">
          <BeardStrokes slug={slug} />
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
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'var(--fonts-catamaran)',
          fontSize: shevy.h4.fontSize,
          fontWeight: 'bold',
        }}
      >
        {label}
      </div>
      <div css={{ display: 'flex', alignItems: 'center' }}>{children}</div>
    </>
  )
}

function Kofi() {
  return (
    <LinkButton
      href="https://ko-fi.com/kyleshevlin"
      overrideStyles={{ width: '100%' }}
    >
      <div css={{ display: 'inline-block' }}>
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <span css={{ fontSize: shevy.h4.fontSize }}>Make a donation</span>
          <Spacer vert={0.25} left={0.5}>
            <ShiftBy y={2}>
              <KofiLogo width={40} />
            </ShiftBy>
          </Spacer>
        </div>
      </div>
    </LinkButton>
  )
}
