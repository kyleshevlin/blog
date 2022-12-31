import React from 'react'
import { Margin } from '@kyleshevlin/layout'
import Button from '../../../components/Button'
import useForceUpdate from '../../../hooks/useForceUpdate'
import { bs } from '../../../shevy'
import { random255 } from '../../../utils'

export default function BackgroundCounter() {
  const counter = React.useRef(0)
  const forceUpdate = useForceUpdate()

  React.useEffect(() => {
    const interval = setInterval(() => {
      counter.current++
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const reset = () => {
    counter.current = 0
    forceUpdate()
  }

  return (
    <div style={{ ...getColors(), padding: bs() }}>
      <div css={{ textAlign: 'center' }}>{counter.current}</div>
      <Margin top={0.5}>
        <div
          css={{
            display: 'flex',
            justifyContent: 'center',
            gap: bs(0.5),
          }}
        >
          <Button onClick={forceUpdate}>Force Update</Button>
          <Button onClick={reset}>Reset</Button>
        </div>
      </Margin>
    </div>
  )
}

/**
 * This might be a little unnecessary, but I'm changing the color of the
 * counter text based on the "brightness" of the rgb values. I'm using
 * a higher number value as a proxy for luminosity given that 255,255,255
 * is white. An alternative would be to get the real luminosity of the values
 */
function getColors() {
  const r = random255()
  const g = random255()
  const b = random255()
  const backgroundColor = `rgb(${r}, ${g}, ${b})`
  const color = (r + g + b) / 3 > 255 / 2 ? 'black' : 'white'

  return { backgroundColor, color }
}
