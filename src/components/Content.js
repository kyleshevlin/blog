import React from 'react'
import { bs } from '../shevy'
import { mq } from '../utils'
import { formatLength } from '../utils/length'
import { CONTENT_WIDTH } from '../constants'
import Flex from './Flex'
import NewsletterCTA from './NewsletterCTA'
import ValueSell from './ValueSell'

export default function Content({
  children,
  courseNickname,
  newsletter = true,
  valueSell = true,
}) {
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
      <div>
        <div
          css={{
            [mq.epsilon]: {
              position: 'sticky',
              top: bs(2),
            },
          }}
        >
          <Flex direction="column" gap={bs(2)}>
            {newsletter && <NewsletterCTA />}
            {valueSell && <ValueSell courseNickname={courseNickname} />}
          </Flex>
        </div>
      </div>
    </div>
  )
}
