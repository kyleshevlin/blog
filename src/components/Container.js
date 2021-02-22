import React from 'react'
import { mq } from '../utils'

const Container = ({ children }) => (
  <div
    css={{
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80%',
      maxWidth: '90ch',

      [mq.bravo]: {
        width: '70%',
      },

      [mq.charlie]: {
        width: '60%',
      },

      [mq.delta]: {
        width: '50%',
      },
    }}
  >
    {children}
  </div>
)

export default Container
