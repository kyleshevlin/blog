import React from 'react'
import { bs } from '../shevy'

export default function EggheadEmbed({ src, title }) {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '56.25%',
        marginBottom: bs(2)
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0
        }}
        src={src}
        title={title}
      />
    </div>
  )
}
