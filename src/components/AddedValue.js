import React from 'react'
import NewsletterCTA from './NewsletterCTA'
import Spacer from './Spacer'
import ValueSell from './ValueSell'

export default function AddedValue({ courseNickname }) {
  return (
    <div>
      <Spacer bottom={2}>
        <NewsletterCTA />
      </Spacer>
      <ValueSell courseNickname={courseNickname} />
    </div>
  )
}
