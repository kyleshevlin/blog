import React from 'react'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'
import { bs } from '../shevy'

function SCDLink({ children }) {
  return <a href="https://secondcareerdevs.com">{children}</a>
}

export default function Podcast() {
  return (
    <>
      <Seo
        title="Podcast"
        keywords={['Podcast', 'Second Career Devs', 'Kyle Shevlin']}
      />
      <h1>Podcast</h1>

      <div
        css={{
          backgroundColor: 'var(--colors-offset)',
          fontFamily: 'var(--fonts-catamaran)',
          padding: bs(),
          marginTop: bs(2),
          marginBottom: bs(2),
        }}
      >
        <strong>Update:</strong> <SCDLink>Second Career Devs</SCDLink> is on
        hiatus and is unlikely to return. The episodes will remain available for
        the forseeable future. Please read{' '}
        <a href="/the-future-of-second-career-devs">
          The Future of Second Career Devs
        </a>{' '}
        for more information.
      </div>

      <p>
        In September of 2017, I came up with the idea for a new podcast. People
        often asked me about my career change from pastor to programming. I
        realized that others might benefit from listening to similar stories. So
        I set out to find great stories of people making career changes to web
        development and software engineering. My favorite part is finding and
        sharing those lessons that could have only been learned by following the
        alternative path they took. Thus, <SCDLink>Second Career Devs</SCDLink>{' '}
        was born, and I'm so glad to share it with you.
      </p>
      <p>
        Be sure to check it out at{' '}
        <SCDLink>https://secondcareerdevs.com</SCDLink> and anywhere you
        subscribe and listen to podcasts!
      </p>

      <AddedValue />
    </>
  )
}
