import React from 'react'
import { CONTENT_WIDTH } from '../constants'
import { mq } from '../utils'
import { formatLength, modifyLength } from '../utils/length'
import { useSpacing } from '@kyleshevlin/layout'

const Container = ({ children }) => {
  const bs = useSpacing()

  return (
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
          maxWidth: formatLength(CONTENT_WIDTH),

          [mq.epsilon]: {
            maxWidth: formatLength(modifyLength(v => v * 2, CONTENT_WIDTH)),
          },
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Container
