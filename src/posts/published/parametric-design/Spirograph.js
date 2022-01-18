import React from 'react'
import generateContext from 'react-generate-context'
import Flex from '../../../components/Flex'
import { Input, useNumberInput } from '../../../components/Inputs'

const [SpiroProvider, useSpiro] = generateContext(() => {
  const [radius1, updateRadius1] = useNumberInput(75)
  const [radius2, updateRadius2] = useNumberInput(60)
  const [ratio, updateRatio] = useNumberInput(16.5)

  return {
    radius1,
    radius2,
    ratio,
    updateRadius1,
    updateRadius2,
    updateRatio,
  }
})

function Controls() {
  const { radius1, radius2, ratio, updateRadius1, updateRadius2, updateRatio } =
    useSpiro()

  return (
    <Flex direction="column" gap={1}>
      <Input
        label="Radius 1"
        type="range"
        min="1"
        max="200"
        onChange={updateRadius1}
        value={radius1}
      />

      <Input
        label="Radius 2"
        type="range"
        min="1"
        max="200"
        onChange={updateRadius2}
        value={radius2}
      />

      <Input
        label="Ratio"
        type="range"
        min="1"
        max="50"
        onChange={updateRatio}
        value={ratio}
      />
    </Flex>
  )
}

function drawBackground({ color, context, width, height }) {
  context.fillStyle = color
  context.fillRect(0, 0, width, height)
}

const getThetaX = (cx, radius1, radius2, ratio, theta) =>
  cx + radius1 * Math.cos(theta) + radius2 * Math.cos(theta * ratio)

const getThetaY = (cy, radius1, radius2, ratio, theta) =>
  cy + radius1 * Math.sin(theta) + radius2 * Math.sin(theta * ratio)

function drawSpirograph({ color, context, cx, cy, radius1, radius2, ratio }) {
  let x
  let y
  let theta

  context.beginPath()
  context.moveTo(cx + radius1 + radius2, cy)

  for (theta = 0; theta <= Math.PI * 4; theta += 0.005) {
    x = getThetaX(cx, radius1, radius2, ratio, theta)
    y = getThetaY(cy, radius1, radius2, ratio, theta)
    context.lineTo(x, y)
  }

  context.strokeStyle = color
  context.lineWidth = 2
  context.stroke()
}

const WIDTH = 480
const HEIGHT = 480

function Spirograph() {
  const { radius1, radius2, ratio } = useSpiro()

  const canvasRef = React.useRef(null)
  const bgRef = React.useRef('#000')
  const lineRef = React.useRef('#fff')

  React.useEffect(() => {
    const el = document.querySelector('html')
    const bgColor = el.style.getPropertyValue('--colors-background')
    const textColor = el.style.getPropertyValue('--colors-text')

    bgRef.current = bgColor
    lineRef.current = textColor
  }, [])

  React.useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')

      drawBackground({
        color: bgRef.current,
        context,
        width: WIDTH,
        height: HEIGHT,
      })

      drawSpirograph({
        color: lineRef.current,
        context,
        cx: WIDTH / 2,
        cy: HEIGHT / 2,
        radius1,
        radius2,
        ratio,
      })
    }
  }, [radius1, radius2, ratio])

  return (
    <div>
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
    </div>
  )
}

export default function FullSpiro() {
  return (
    <SpiroProvider>
      <Flex
        align="center"
        gap={1}
        style={{ fontFamily: 'var(--fonts-catamaran)' }}
        wrap="wrap"
      >
        <div style={{ flexShrink: 0 }}>
          <Spirograph />
        </div>
        <Controls />
      </Flex>
    </SpiroProvider>
  )
}
