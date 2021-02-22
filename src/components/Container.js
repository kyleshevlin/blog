import React from 'react'
import { BREAKPOINTS } from '../constants'
import { mq } from '../utils'

const Container = ({ children }) => (
  <div
    css={{
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80%',
      maxWidth: '90ch',

      [mq(BREAKPOINTS.bravo)]: {
        width: '70%',
      },

      [mq(BREAKPOINTS.charlie)]: {
        width: '60%',
      },

      [mq(BREAKPOINTS.delta)]: {
        width: '50%',
      },
    }}
  >
    {children}
  </div>
)

export default Container
