import React from 'react'
import Seo from '../components/Seo'
import Content from '../components/Content'
import Layout from '../components/Layout'

const Contact = () => (
  <Layout>
    <Seo title="Contact" keywords={['Contact', 'Kyle Shevlin']} />

    <Content>
      <h1>Contact</h1>
      <p>
        Reaching out to me on Twitter is the best way to get ahold of me. You
        can find me at{' '}
        <a href="https://twitter.com/kyleshevlin">@kyleshevlin</a>.
      </p>
    </Content>
  </Layout>
)

export default Contact
