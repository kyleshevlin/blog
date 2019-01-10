import React, { Fragment } from 'react'
import FontFaces from './FontFaces'
import Reset from './Reset'
import Tags from './Tags'
import Tweets from './Tweets'
import Typography from './Typography'

const Styles = () => (
  <Fragment>
    <Reset />
    <FontFaces />
    <Tags />
    <Typography />
    <Tweets />
  </Fragment>
)

export default Styles
