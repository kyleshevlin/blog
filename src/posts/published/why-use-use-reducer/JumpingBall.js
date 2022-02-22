import React from 'react'
import Button from '../../../components/Button'
import Flex from '../../../components/Flex'

const GRAVITY = 0.5
const JUMP_IMPULSE = 12
const BALL_SIZE = 20

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

    deltaRef.current = JUMP_IMPULSE
    ballState.current = BALL_STATE.jumping
  }, [])

  return (
    <Flex direction="column" gap={1} align="center">
      <Canvas>
        <Ball position={position} />
      </Canvas>
      <Button onClick={handleClick}>Jump</Button>
    </Flex>
  )
}

function Canvas({ children }) {
  return (
    <div
      css={{
        border: '2px solid var(--colors-offsetMore)',
        position: 'relative',
        height: 300,
        width: '100%',
      }}
    >
      {children}
    </div>
  )
}

function Ball({ position }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--colors-accent)',
        height: BALL_SIZE,
        width: BALL_SIZE,
        borderRadius: '50%',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: position,
      }}
    />
  )
}
