import React from 'react'
import { Button } from '../../../components/Button'
import { randomRGB } from '../../../utils'

export default function RandomBox() {
  const ref = React.useRef(true)
  const flip = React.useCallback(() => {
    ref.current = !ref.current
    console.log(`Hey reader! \`ref\` is now ${ref.current}`)
  }, [])

  return (
    <div
      className="flex justify-center p-4"
      style={{
        backgroundColor: randomRGB(),
      }}
    >
      <Button onClick={flip}>Try to update</Button>
    </div>
  )
}
