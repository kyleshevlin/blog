import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Reset from '../styles/Reset'
import FontFaces from '../styles/FontFaces'
import Tags from '../styles/Tags'
import Typography from '../styles/Typography'
import Tweets from '../styles/Tweets'

const Styles = () => (
  <Fragment>
    <Reset />
    <FontFaces />
    <Tags />
    <Typography />
    <Tweets />
  </Fragment>
)

const Wrapper = ({ children }) => (
  <Fragment>
    <Styles />
    {children}
  </Fragment>
)

Wrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default Wrapper
