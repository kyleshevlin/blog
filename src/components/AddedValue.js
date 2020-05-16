import React from 'react'
import NewsletterCTA from './NewsletterCTA'
import ValueSell from './ValueSell'
import { bs } from '../shevy'

export default function AddedValue() {
  return (
    <div>
      <div css={{ marginTop: bs(2), marginBottom: bs(2) }}>
        <NewsletterCTA />
      </div>
      <ValueSell />
    </div>
  )
}
