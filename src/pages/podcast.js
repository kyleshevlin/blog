import React, { Fragment } from 'react'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'

const Podcast = () => (
  <Fragment>
    <Seo
      title="Podcast"
      keywords={['Podcast', 'Second Career Devs', 'Kyle Shevlin']}
    />
    <h1>Podcast</h1>
    <p>
      In September of 2017, I came up with the idea for a new podcast. People
      often asked me about my career change from pastor to programming. I
      realized that others might benefit from listening to similar stories. So I
      set out to find great stories of people making career changes to web
      development and software engineering. My favorite part is finding and
      sharing those lessons that could have only been learned by following the
      alternative path they took. Thus,{' '}
      <a href="https://secondcareerdevs.com">Second Career Devs</a> was born,
      and I'm so glad to share it with you.
    </p>
    <p>
      Be sure to check it out at{' '}
      <a href="https://secondcareerdevs.com">https://secondcareerdevs.com</a>{' '}
      and anywhere you subscribe and listen to podcasts!
    </p>

    <AddedValue />
  </Fragment>
)

export default Podcast
