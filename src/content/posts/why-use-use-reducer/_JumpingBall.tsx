import React from 'react'
import { Button } from '../../../components/Button'
import { Ball, Canvas, Wrap } from './_shared'

const GRAVITY = 0.5
const JUMP_IMPULSE = 12

const BALL_STATE = {
  idle: 'idle',
  jumping: 'jumping',
}

export default function JumpingBall() {
  const [position, setPosition] = React.useState(0)
  const deltaRef = React.useRef(0)
  const ballState = React.useRef(BALL_STATE.idle)

  const tick = React.useCallback(() => {
    if (ballState.current === BALL_STATE.idle) return

    setPosition(pos => {
      deltaRef.current -= GRAVITY
      const nextPos = Math.floor(pos + deltaRef.current)

      if (nextPos <= 0) {
        deltaRef.current = 0
        ballState.current = BALL_STATE.idle
        return 0
      }

      return nextPos
    })
  }, [])

  React.useEffect(() => {
    const id = setInterval(tick, 1000 / 60)

    return () => clearInterval(id)
  }, [tick])

  const handleClick = React.useCallback(() => {
    if (ballState.current === BALL_STATE.jumping) return

    deltaRef.current += JUMP_IMPULSE
    ballState.current = BALL_STATE.jumping
  }, [])

  return (
    <Wrap>
      <Canvas>
        <Ball position={position} />
      </Canvas>

      <Button onClick={handleClick}>Jump</Button>
    </Wrap>
  )
}
