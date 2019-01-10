import React, { Fragment } from 'react'
import Seo from '../components/Seo'

const Contact = () => (
  <Fragment>
    <Seo title="Contact" keywords={['Contact', 'Kyle Shevlin']} />
    <h1>Contact</h1>
    <p>
      If you're looking to get ahold of me, you can send me an email at{' '}
      <a href="mailto:kyle.a.shevlin@gmail.com">kyle.a.shevlin@gmail.com</a>.
      You can also reach me on Twitter at{' '}
      <a href="https://twitter.com/kyleshevlin">@kyleshevlin</a>.
    </p>
    <p>
      If desperate, I check{' '}
      <a href="https://linkedin.com/in/kyleshevlin">LinkedIn</a> about once a
      week.
    </p>
  </Fragment>
)

export default Contact
