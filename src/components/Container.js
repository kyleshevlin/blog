import React from 'react'
import { bs } from '../shevy'
import { mq } from '../utils'

const Container = ({ children }) => (
  <div
    css={{
      paddingLeft: bs(1.5),
      paddingRight: bs(1.5),

      [mq.bravo]: {
        paddingLeft: bs(3),
        paddingRight: bs(3),
      },
    }}
  >
    <div
      css={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '90ch',
      }}
    >
      {children}
    </div>
  </div>
)

export default Container
