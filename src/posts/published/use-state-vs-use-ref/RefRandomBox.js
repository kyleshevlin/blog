import React from 'react'
import Button from '../../../components/Button'
import { randomRGB } from '../../../utils'
import { useSpacing } from '@kyleshevlin/layout'

export default function RandomBox() {
  const bs = useSpacing()
  const ref = React.useRef(true)
  const flip = React.useCallback(() => {
    ref.current = !ref.current
    console.log(`Hey reader! \`ref\` is now ${ref.current}`)
  }, [])

  return (
    <div
      css={{
        backgroundColor: randomRGB(),
        padding: bs(1),
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Button onClick={flip}>Try to update</Button>
    </div>
  )
}
