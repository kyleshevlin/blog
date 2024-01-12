import React from 'react'
import { Flex, useSpacing } from '@kyleshevlin/layout'
import { mq } from '../utils'
import { formatLength } from '../utils/length'
import { CONTENT_WIDTH } from '../constants'
import { Agathist } from './Agathist'
import NewsletterCTA from './NewsletterCTA'
import ValueSell from './ValueSell'

export default function Content({
  children,
  courseNickname,
  newsletter = true,
  valueSell = true,
}) {
  const bs = useSpacing()

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: bs(2),

        [mq.epsilon]: {
          display: 'grid',
          gridTemplateColumns: `${formatLength(CONTENT_WIDTH)} auto`,
          gap: bs(4),
        },
      }}
    >
      <main>{children}</main>

      <div css={{ minWidth: 0 }}>
        <div
          css={{
            [mq.epsilon]: {
              position: 'sticky',
              top: bs(2),
            },
          }}
        >
          <Flex direction="column" gap={2}>
            <Agathist />
            {newsletter && <NewsletterCTA />}
            {valueSell && <ValueSell courseNickname={courseNickname} />}
          </Flex>
        </div>
      </div>
    </div>
  )
}
