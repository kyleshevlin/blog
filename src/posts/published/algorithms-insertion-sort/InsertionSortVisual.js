import React from 'react'
import { Flex } from '@kyleshevlin/layout'
import Button from '../../../components/Button'

const NUMBERS = Array(50)
  .fill(1)
  .map((x, i) => x + i)

const getInitialState = () => {
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

export function InsertionSortVisual({ fps = 15 }) {
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
    let id

    if (playState === 'sorting') {
      id = setInterval(tick, 1000 / fps)
    }

    return () => clearInterval(id)
  }, [fps, playState, tick])

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
          <Item
            key={`${num}-${i}`}
            num={num}
            isOuterItem={outerIdx === i}
            isInnerItem={innerIdx === i}
          />
        ))}
      </Flex>
    </Flex>
  )
}

function Item({ num, isOuterItem, isInnerItem }) {
  return (
    <div
      style={{
        backgroundColor: isOuterItem
          ? 'var(--colors-accent)'
          : isInnerItem
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

function* insertionSort(items) {
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
