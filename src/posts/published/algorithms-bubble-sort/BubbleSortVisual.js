import React from 'react'
import { Flex } from '@kyleshevlin/layout'
import Button from '../../../components/Button'
import useForceUpdate from '../../../hooks/useForceUpdate'

const NUMBERS = Array(49)
  .fill(1)
  .map((x, i) => x + i)

export function BubbleSortVisual() {
  const forceUpdate = useForceUpdate()
  const items = React.useRef(shuffle(NUMBERS))
  const generator = React.useRef(bubbleSort(items.current))
  const idx = React.useRef(-1)
  const count = React.useRef(0)
  const [playState, setPlayState] = React.useState('paused')

  const handleShuffle = () => {
    items.current = shuffle(NUMBERS)
    generator.current = bubbleSort(items.current)
    idx.current = -1
    count.current = 0
    // We have to reset the state to `paused`, but this won't always trigger an
    // update (if the user shuffles while the deck is paused), so we still need
    // to forceUpdate for all the ref changes
    setPlayState('paused')
    forceUpdate()
  }

  const handleSort = () => {
    setPlayState(s => {
      switch (s) {
        case 'paused':
          return 'sorting'
        case 'sorting':
          return 'paused'
      }
    })
  }

  React.useEffect(() => {
    let id

    if (playState === 'sorting') {
      id = setInterval(() => {
        const { done, value } = generator.current.next()
        count.current++

        if (done) {
          setPlayState('complete')
          return
        }

        if (value) {
          idx.current = value[1]
          forceUpdate()
        }
      }, 1000 / 30)
    }

    return () => {
      if (id) {
        clearInterval(id)
      }
    }
  }, [forceUpdate, playState])

  return (
    <Flex direction="column" gap={1}>
      <Flex gap={0.5} align="baseline" justify="space-between">
        <div css={{ fontFamily: 'var(--fonts-secondary)' }}>
          Comparisons: {count.current}
        </div>

        <Flex gap={0.5}>
          <Button disabled={playState === 'sorting'} onClick={handleShuffle}>
            Shuffle
          </Button>
          <Button disabled={playState === 'complete'} onClick={handleSort}>
            {playState === 'sorting' ? 'Pause' : 'Start'}
          </Button>
        </Flex>
      </Flex>

      <Flex align="flex-end" justify="space-between">
        {items.current.map((num, i) => (
          <div
            key={num}
            style={{
              backgroundColor:
                idx.current === i
                  ? 'var(--colors-contra)'
                  : 'var(--colors-offsetMore)',
              width: 4,
              height: num * 1,
            }}
          />
        ))}
      </Flex>
    </Flex>
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

    for (const [idx, item] of items.entries()) {
      count++
      const nextItem = items[idx + 1]

      if (item > nextItem) {
        items[idx] = nextItem
        items[idx + 1] = item
        swapped = true
      }

      yield [items, idx, count]
    }
  } while (swapped)

  return [items, -1, count]
}
