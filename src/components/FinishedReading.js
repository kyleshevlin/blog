import React from 'react'
import BeardStrokes from './BeardStrokes'

export default function FinishedReading({ beardStrokeKey }) {
  return (
    <div>
      <h3 css={{ fontWeight: 'bold' }}>Finished reading?</h3>
      <p>
        Liked the post? Give the author a dopamine boost with a few "beard
        strokes". Click it up to 50 times show your appreciation.
      </p>

      <BeardStrokes slug={beardStrokeKey} />
    </div>
  )
}
