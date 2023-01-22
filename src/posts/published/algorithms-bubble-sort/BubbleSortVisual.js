import React from 'react'
import { Flex } from '@kyleshevlin/layout'
import Button from '../../../components/Button'

const NUMBERS = Array(50)
  .fill(1)
  .map((x, i) => x + i)

const getInitialState = () => {
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

function reducer(state, action) {
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

export function BubbleSortVisual() {
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
    let id

    if (playState === 'sorting') {
      id = setInterval(tick, 1000 / 15)
    }

    return () => clearInterval(id)
  }, [playState, tick])

  return (
    <Flex direction="column" gap={1}>
      <Flex align="baseline" justify="space-between">
        <div css={{ fontFamily: 'var(--fonts-secondary)' }}>
          Comparisons: {count}
        </div>

        <Flex gap={0.5}>
          <Button disabled={playState === 'sorting'} onClick={handleShuffle}>
            Shuffle
          </Button>
          <Button disabled={playState === 'complete'} onClick={handleSort}>
            {playState === 'sorting' ? 'Pause' : 'Sort'}
          </Button>
        </Flex>
      </Flex>

      <Flex align="flex-end" justify="space-between">
        {items.map((num, i) => (
          <Item key={`${num}-${i}`} num={num} isHighlighted={idx === i} />
        ))}
      </Flex>
    </Flex>
  )
}

function Item({ num, isHighlighted }) {
  return (
    <div
      style={{
        backgroundColor: isHighlighted
          ? 'var(--colors-contra)'
          : 'var(--colors-offsetMore)',
        width: 4,
        height: num * 1,
      }}
    />
  )
}

// Uses the Fisher-Yates algorithm
function shuffle(array) {
  const result = [...array]

  for (let i = result.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))

    const tmp = result[i]
    result[i] = result[j]
    result[j] = tmp
  }

  return result
}

function* bubbleSort(items) {
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
