import React from 'react'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'
import Container from '../components/Container'
import Main from '../components/Main'

const Contact = () => (
  <Container>
    <Main>
      <Seo title="Contact" keywords={['Contact', 'Kyle Shevlin']} />
      <h1>Contact</h1>
      <p>
        Reaching out to me on Twitter is the best way to get ahold of me. You
        can find me at{' '}
        <a href="https://twitter.com/kyleshevlin">@kyleshevlin</a>.
      </p>

      <AddedValue />
    </Main>
  </Container>
)

export default Contact
