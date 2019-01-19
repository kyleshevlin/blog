import React from 'react'
import { COLORS, FONTS } from '../constants'
import { bs } from '../shevy'

const PostDate = ({ date }) => (
  <div css={{ marginBottom: bs(0.75) }}>
    <div
      css={{
        display: 'inline-block',
        fontFamily: FONTS.catamaran,
        fontSize: '0.75187rem',
        lineHeight: 1.8,
        paddingLeft: '2px',
        paddingRight: '2px',
        borderBottom: `3px solid ${COLORS.teal}`
      }}
    >
      {date}
    </div>
  </div>
)

export default PostDate
