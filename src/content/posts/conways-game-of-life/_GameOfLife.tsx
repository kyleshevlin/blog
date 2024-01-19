import React from 'react'
import { Button } from '../../../components/Button'

const randomBool = () => Boolean(Math.round(Math.random()))

function createSim() {
  let state = Array(10)
    .fill(undefined)
    .map(() => Array(10).fill(false))

  function getNumberOfNeighbors(rowIdx: number, colIdx: number) {
    const neighborIndices = [
      [rowIdx - 1, colIdx - 1],
      [rowIdx - 1, colIdx],
      [rowIdx - 1, colIdx + 1],
      [rowIdx, colIdx - 1],
      [rowIdx, colIdx + 1],
      [rowIdx + 1, colIdx - 1],
      [rowIdx + 1, colIdx],
      [rowIdx + 1, colIdx + 1],
    ]

    const neighbors = neighborIndices
      .map(([row, col]) => state?.[row]?.[col])
      .filter(Boolean)

    return neighbors.length
  }

  return {
    tick() {
      const nextState = state.map((row, rowIdx) =>
        row.map((cellState, colIdx) => {
          const neighbors = getNumberOfNeighbors(rowIdx, colIdx)

          if (!cellState) return neighbors === 3

          switch (neighbors) {
            case 2:
            case 3:
              return true
            default:
              return false
          }
        }),
      )
      state = nextState
      return this
    },
    toggleCell(rowIdx, colIdx) {
      state[rowIdx][colIdx] = !state[rowIdx][colIdx]
      state = state.map(row => row.map(x => x))
      return this
    },
    randomize() {
      const nextState = state.map(row => row.map(randomBool))
      state = nextState
      return this
    },
    getState() {
      return state
    },
  }
}

const INTERVAL = 150

export default function GameOfLife() {
  const simRef = React.useRef(createSim())
  const [grid, setGrid] = React.useState(simRef.current.getState())
  const [gameState, setGameState] = React.useState('paused')

  React.useEffect(() => {
    if (gameState === 'paused') return

    const intervalId = setInterval(() => {
      setGrid(simRef.current.tick().getState())
    }, INTERVAL)

    return () => {
      clearInterval(intervalId)
    }
  }, [gameState])

  const handleCellClick = React.useCallback(
    (rowIdx: number, colIdx: number) => () => {
      setGrid(simRef.current.toggleCell(rowIdx, colIdx).getState())
    },
    [],
  )

  const handleGameToggle = React.useCallback(() => {
    setGameState(s => (s === 'paused' ? 'running' : 'paused'))
  }, [])

  const randomizeCells = React.useCallback(() => {
    setGrid(simRef.current.randomize().getState())
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <div>
          {grid.map((row, rowIdx) => (
            <div className="flex" key={rowIdx}>
              {row.map((cellState, colIdx) => (
                <button
                  key={colIdx}
                  onClick={handleCellClick(rowIdx, colIdx)}
                  className={`${cellState ? 'bg-accent' : 'bg-gray-300'} m-1 h-4 w-4 rounded-sm transition-all sm:h-5 sm:w-5`}
                  type="button"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2">
        <Button onClick={handleGameToggle}>
          {gameState === 'paused' ? 'Start' : 'Stop'}
        </Button>

        <Button onClick={randomizeCells}>Randomize</Button>
      </div>
    </div>
  )
}
