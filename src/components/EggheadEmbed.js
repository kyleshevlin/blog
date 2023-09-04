import React from 'react'
import { EGGHEAD_AFFILIATE_QUERY_PARAM } from '../constants'
import { useSpacing } from '@kyleshevlin/layout'

export default function EggheadEmbed({ src, title = '' }) {
  const bs = useSpacing()

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '56.25%',
        marginBottom: bs(2),
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0,
        }}
        src={src + EGGHEAD_AFFILIATE_QUERY_PARAM}
        title={title}
      />
    </div>
  )
}
