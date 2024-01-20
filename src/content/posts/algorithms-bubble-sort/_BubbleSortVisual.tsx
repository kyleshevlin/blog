import React from 'react'
import { Button } from '../../../components/Button'

type State = {
  count: number
  generator: ReturnType<typeof bubbleSort>
  idx: number
  items: number[]
  playState: 'complete' | 'sorting' | 'paused'
}

const NUMBERS = Array(50)
  .fill(1)
  .map((x, i) => x + i)

const getInitialState = (): State => {
  const items = shuffle(NUMBERS)
  const generator = bubbleSort(items)

  return {
    count: 0,
    generator,
    idx: -1,
    items,
    playState: 'paused',
  }
}

type Action =
  | { type: 'SHUFFLE' }
  | { type: 'TOGGLE_SORTING' }
  | { type: 'TICK' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SHUFFLE':
      return getInitialState()

    case 'TOGGLE_SORTING': {
      switch (state.playState) {
        case 'paused':
          return { ...state, playState: 'sorting' }

        case 'sorting':
          return { ...state, playState: 'paused' }

        default:
          return state
      }
    }

    case 'TICK': {
      const { done, value } = state.generator.next()

      if (done) return { ...state, playState: 'complete' }

      const [nextItems, nextIdx, nextCount] = value

      return {
        ...state,
        items: nextItems,
        idx: nextIdx,
        count: nextCount,
      }
    }

    default:
      return state
  }
}

export function BubbleSortVisual({ fps = 15 }: { fps?: number }) {
  const [state, dispatch] = React.useReducer(reducer, getInitialState())
  const { count, idx, items, playState } = state

  const handleShuffle = React.useCallback(() => {
    dispatch({ type: 'SHUFFLE' })
  }, [])

  const handleSort = React.useCallback(() => {
    dispatch({ type: 'TOGGLE_SORTING' })
  }, [])

  const tick = React.useCallback(() => {
    dispatch({ type: 'TICK' })
  }, [])

  React.useEffect(() => {
    let id: ReturnType<typeof setInterval>

    if (playState === 'sorting') {
      id = setInterval(tick, 1000 / fps)
    }

    return () => clearInterval(id)
  }, [fps, playState, tick])

  return (
    <div className="flex flex-col gap-8 rounded border-2 border-gray-200 p-4">
      <div className="flex items-baseline justify-between">
        <div className="font-sans">
          <div>Comparisons: {count}</div>

          <div className="flex items-baseline gap-2">
            <div>idx</div>
            <div className="h-3 w-3 rounded-sm bg-contra" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button disabled={playState === 'sorting'} onClick={handleShuffle}>
            Shuffle
          </Button>
          <Button disabled={playState === 'complete'} onClick={handleSort}>
            {playState === 'sorting' ? 'Pause' : 'Sort'}
          </Button>
        </div>
      </div>

      <div className="flex items-end justify-between">
        {items.map((num, i) => {
          const isHighlighted = idx === i

          return (
            <div
              className={isHighlighted ? 'bg-contra' : 'bg-gray-300'}
              key={num}
              style={{ width: 4, height: num }}
            />
          )
        })}
      </div>
    </div>
  )
}

// Uses the Fisher-Yates algorithm
function shuffle(array: number[]) {
  const result = [...array]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    const tmp = result[i]
    result[i] = result[j]
    result[j] = tmp
  }

  return result
}

type YieldedTuple = [number[], number, number]

function* bubbleSort(items: number[]): Generator<YieldedTuple, YieldedTuple> {
  let count = 0
  let swapped = false

  // A perfectly sorted list needs to be looped through once
  // to verify it's sorted
  do {
    swapped = false

    for (let i = 0; i < items.length; i++) {
      count++
      const item = items[i]
      const nextItem = items[i + 1]

      if (item > nextItem) {
        items[i] = nextItem
        items[i + 1] = item
        swapped = true
      }

      yield [items, i, count]
    }
  } while (swapped)

  return [items, -1, count]
}
