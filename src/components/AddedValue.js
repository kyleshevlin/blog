import React from 'react'
import NewsletterCTA from './NewsletterCTA'
import Margin from './Margin'
import ValueSell from './ValueSell'

export default function AddedValue({ courseNickname }) {
  return (
    <div>
      <Margin bottom={2}>
        <NewsletterCTA />
      </Margin>
      <ValueSell courseNickname={courseNickname} />
    </div>
  )
}
