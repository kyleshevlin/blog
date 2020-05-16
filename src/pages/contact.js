import React, { Fragment } from 'react'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'

const Contact = () => (
  <Fragment>
    <Seo title="Contact" keywords={['Contact', 'Kyle Shevlin']} />
    <h1>Contact</h1>
    <p>
      Reaching out to me on Twitter is the best way to get ahold of me. You can
      find me at <a href="https://twitter.com/kyleshevlin">@kyleshevlin</a>.
    </p>

    <AddedValue />
  </Fragment>
)

export default Contact
