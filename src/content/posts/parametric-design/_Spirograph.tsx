import React from 'react'
import { Input, useNumberInput } from '../../../components/Inputs'

type ContextValue = {
  radius1: number
  radius2: number
  ratio: number
  updateRadius1: React.ChangeEventHandler<HTMLInputElement>
  updateRadius2: React.ChangeEventHandler<HTMLInputElement>
  updateRatio: React.ChangeEventHandler<HTMLInputElement>
}

const SpiroContext = React.createContext(undefined as unknown as ContextValue)

function SpiroProvider({ children }: { children: React.ReactNode }) {
  const [radius1, updateRadius1] = useNumberInput(75)
  const [radius2, updateRadius2] = useNumberInput(60)
  const [ratio, updateRatio] = useNumberInput(16.5)

  return (
    <SpiroContext.Provider
      value={{
        radius1,
        radius2,
        ratio,
        updateRadius1,
        updateRadius2,
        updateRatio,
      }}
    >
      {children}
    </SpiroContext.Provider>
  )
}

const useSpiro = () => React.useContext(SpiroContext)

function Controls() {
  const { radius1, radius2, ratio, updateRadius1, updateRadius2, updateRatio } =
    useSpiro()

  return (
    <div className="flex flex-col gap-4">
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
    </div>
  )
}

function drawBackground({
  color,
  context,
  width,
  height,
}: {
  color: string
  context: any
  width: number
  height: number
}) {
  context.fillStyle = color
  context.fillRect(0, 0, width, height)
}

const getThetaX = (
  cx: number,
  radius1: number,
  radius2: number,
  ratio: number,
  theta: number,
) => cx + radius1 * Math.cos(theta) + radius2 * Math.cos(theta * ratio)

const getThetaY = (
  cy: number,
  radius1: number,
  radius2: number,
  ratio: number,
  theta: number,
) => cy + radius1 * Math.sin(theta) + radius2 * Math.sin(theta * ratio)

type DrawSpiroArgs = {
  color: string
  context: any
  cx: number
  cy: number
  radius1: number
  radius2: number
  ratio: number
}

function drawSpirograph({
  color,
  context,
  cx,
  cy,
  radius1,
  radius2,
  ratio,
}: DrawSpiroArgs) {
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

const WIDTH = 360
const HEIGHT = WIDTH

function Spirograph() {
  const { radius1, radius2, ratio } = useSpiro()

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')

      drawBackground({
        color: 'white',
        context,
        width: WIDTH,
        height: HEIGHT,
      })

      drawSpirograph({
        color: 'black',
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
    <div className="overflow-hidden rounded border-2 border-gray-300 dark:border-gray-700">
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
    </div>
  )
}

export default function FullSpiro() {
  return (
    <SpiroProvider>
      <div className="flex flex-wrap items-center justify-center gap-4 font-sans">
        <div className="dark:invert">
          <Spirograph />
        </div>

        <Controls />
      </div>
    </SpiroProvider>
  )
}
