import React, { Fragment } from 'react'
import FontFaces from '../styles/FontFaces'
import Reset from '../styles/Reset'
import Tags from '../styles/Tags'
import Tweets from '../styles/Tweets'
import Typography from '../styles/Typography'

const GlobalStyleWrapper = ({ children }) => (
  <Fragment>
    <Reset />
    <FontFaces />
    <Tags />
    <Typography />
    <Tweets />
    {children}
  </Fragment>
)

export default GlobalStyleWrapper
