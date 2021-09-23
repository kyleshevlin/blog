import React from 'react'
import Button from '../../../components/Button'
import { bs } from '../../../shevy'
import { randomRGB } from '../../../utils'

export default function RandomBox() {
  const ref = React.useRef(true)
  const flip = React.useCallback(() => {
    ref.current = !ref.current
    console.log(`Hey reader! \`ref\` is now ${ref.current}`)
  }, [])

  return (
    <div
      css={{
        backgroundColor: randomRGB(),
        padding: bs(),
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Button onClick={flip}>Try to update</Button>
    </div>
  )
}
