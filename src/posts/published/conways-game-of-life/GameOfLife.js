import React from 'react'
import Button from '../../../components/Button'
import Flex from '../../../components/Flex'
import Margin from '../../../components/Margin'
import { mq } from '../../../utils'

const randomBool = () => Boolean(Math.round(Math.random()))

function createSim() {
  let state = Array(10)
    .fill()
    .map(() => Array(10).fill(false))

  function getNumberOfNeighbors(rowIdx, colIdx) {
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
        })
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
    (rowIdx, colIdx) => () => {
      setGrid(simRef.current.toggleCell(rowIdx, colIdx).getState())
    },
    []
  )

  const handleGameToggle = React.useCallback(() => {
    setGameState(s => (s === 'paused' ? 'running' : 'paused'))
  }, [])

  const randomizeCells = React.useCallback(() => {
    setGrid(simRef.current.randomize().getState())
  }, [])

  return (
    <Flex justify="center">
      <div>
        <div>
          {grid.map((row, rowIdx) => (
            <Flex key={rowIdx}>
              {row.map((cellState, colIdx) => (
                <button
                  key={colIdx}
                  onClick={handleCellClick(rowIdx, colIdx)}
                  css={{
                    backgroundColor: cellState
                      ? 'var(--colors-accent)'
                      : 'var(--colors-offset)',
                    border: 'none',
                    borderRadius: '50%',
                    height: 15,
                    margin: 3,
                    transition: `all ${INTERVAL / 2}ms linear`,
                    width: 15,

                    [mq.alpha]: {
                      height: 20,
                      margin: 5,
                      width: 20,
                    },
                  }}
                  type="button"
                />
              ))}
            </Flex>
          ))}
        </div>
        <Margin top={1}>
          <Flex justify="space-between">
            <Button onClick={handleGameToggle}>
              {gameState === 'paused' ? 'Start' : 'Stop'}
            </Button>
            <Button onClick={randomizeCells}>Randomize</Button>
          </Flex>
        </Margin>
      </div>
    </Flex>
  )
}
