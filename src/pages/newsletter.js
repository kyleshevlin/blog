import React, { Fragment } from 'react'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'

export default function Newsletter() {
  return (
    <Fragment>
      <Seo title="Newsletter" keywords={['Newsletter', 'Kyle Shevlin']} />
      <h1>Newsletter</h1>
      <AddedValue />
    </Fragment>
  )
}
