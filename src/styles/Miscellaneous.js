import React from 'react'
import { Global } from '@emotion/core'
import { COLORS } from '../constants'
import { bs } from '../shevy'

const Miscellaneous = () => (
  <Global
    styles={{
      '.gatsby-resp-image-wrapper': {
        boxShadow: `0 4px 8px ${COLORS.gray}`,
        marginTop: bs(2),
        marginBottom: bs(2)
      }
    }}
  />
)

export default Miscellaneous
