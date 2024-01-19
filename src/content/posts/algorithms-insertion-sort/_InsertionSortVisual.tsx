import React from 'react'
import { Button } from '../../../components/Button'

type State = {
  count: number
  generator: ReturnType<typeof insertionSort>
  outerIdx: number
  innerIdx: number
  items: number[]
  playState: 'paused' | 'sorting' | 'complete'
}

const NUMBERS = Array(50)
  .fill(1)
  .map((x, i) => x + i)

const getInitialState = (): State => {
  const items = shuffle(NUMBERS)
  const generator = insertionSort(items)

  return {
    count: 0,
    generator,
    outerIdx: -1,
    innerIdx: -1,
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

      const [nextItems, nextOuterIndex, nextInnerIdx, nextCount] = value

      return {
        ...state,
        items: nextItems,
        outerIdx: nextOuterIndex,
        innerIdx: nextInnerIdx,
        count: nextCount,
      }
    }

    default:
      return state
  }
}

export function InsertionSortVisual({ fps = 15 }: { fps?: number }) {
  const [state, dispatch] = React.useReducer(reducer, getInitialState())
  const { count, outerIdx, innerIdx, items, playState } = state

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

          <div className="flex gap-4 text-sm">
            <div className="flex items-baseline gap-2">
              <div>i</div>
              <div className="h-3 w-3 rounded-sm bg-accent" />
            </div>
            <div className="flex items-baseline gap-2">
              <div>j</div>
              <div className="bg-contra h-3 w-3 rounded-sm" />
            </div>
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
          const isOuterItem = outerIdx === i
          const isInnerItem = innerIdx === i

          const bg = isOuterItem
            ? 'bg-accent'
            : isInnerItem
              ? 'bg-contra'
              : 'bg-gray-300 dark:bg-gray-800'

          return (
            <div key={num} style={{ width: 4, height: num }} className={bg} />
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

type YieldedTuple = [number[], number, number, number]

function* insertionSort(
  items: number[],
): Generator<YieldedTuple, YieldedTuple> {
  let count = 0
  let i
  let j

  // Loop from the 2nd item on
  for (i = 1; i < items.length; i++) {
    // Loop from the first item to the outer item
    for (j = 0; j < i; j++) {
      count++

      if (items[i] < items[j]) {
        const [item] = items.splice(i, 1) // Remove the `outerItem`
        items.splice(j, 0, item) // Splice it in at `j`
      }

      yield [items, i, j, count]
    }
  }

  return [items, -1, -1, count]
}
