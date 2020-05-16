import React from 'react'
import PropTypes from 'prop-types'
import { bs } from '../shevy'

const BannerImage = ({ alt, src }) => (
  <div css={{ marginBottom: bs(2) }}>
    <img css={{ display: 'block' }} alt={alt} src={src} />
  </div>
)

BannerImage.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
}

BannerImage.defaultProps = {
  alt: '',
}

export default BannerImage
