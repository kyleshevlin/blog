import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

const Podcast = () => (
  <Layout>
    <SEO
      title="Podcast"
      keywords={['Podcast', 'Second Career Devs', 'Kyle Shevlin']}
    />
    <h1>Podcast</h1>
    <p>
      In September of 2017, I came up with the idea for a new podcast that would
      find developers who had made big career changes to software engineering
      and wanted to share the lessons they learned along the way. Out of this
      idea, <a href="https://secondcareerdevs.com">Second Career Devs</a> was
      born.
    </p>
    <p>
      The first episode released in November, and currently there are 10
      interviews to listen to. There are plans to do more in the fall of 2018.
    </p>
    <p>
      Be sure to check it out at{' '}
      <a href="https://secondcareerdevs.com">https://secondcareerdevs.com</a>{' '}
      and anywhere you subscribe and listen to podcasts!
    </p>
  </Layout>
)

export default Podcast
