import React from 'react'
import { Flex } from '@kyleshevlin/layout'
import NewsletterCTA from './NewsletterCTA'
import ValueSell from './ValueSell'

export default function AddedValue({ courseNickname }) {
  return (
    <Flex direction="column" gap={2}>
      <NewsletterCTA />
      <ValueSell courseNickname={courseNickname} />
    </Flex>
  )
}
