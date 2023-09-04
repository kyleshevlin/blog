import React from 'react'
import PropTypes from 'prop-types'
import { useSpacing } from '@kyleshevlin/layout'

const BannerImage = ({ alt, src }) => {
  const bs = useSpacing()

  return (
    <div css={{ marginBottom: bs(2) }}>
      <img css={{ display: 'block' }} alt={alt} src={src} />
    </div>
  )
}

BannerImage.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
}

BannerImage.defaultProps = {
  alt: '',
}

export default BannerImage
