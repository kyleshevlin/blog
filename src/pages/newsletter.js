import React from 'react'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'
import Container from '../components/Container'
import Main from '../components/Main'

export default function Newsletter() {
  return (
    <Container>
      <Main>
        <Seo title="Newsletter" keywords={['Newsletter', 'Kyle Shevlin']} />
        <h1>Newsletter</h1>
        <AddedValue />
      </Main>
    </Container>
  )
}
