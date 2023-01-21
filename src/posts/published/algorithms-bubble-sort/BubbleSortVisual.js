import React from 'react'
import { Flex } from '@kyleshevlin/layout'
import Button from '../../../components/Button'
import useForceUpdate from '../../../hooks/useForceUpdate'
import shevy, { bs } from '../../../shevy'

const NUMBERS = Array(50)
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
    function iterate() {
      const { done, value } = generator.current.next()

      if (done) {
        setPlayState('complete')
        return
      }

      if (value) {
        idx.current = value[1]
        count.current = value[2]
        forceUpdate()
      }
    }

    let id
    if (playState === 'sorting') {
      id = setInterval(iterate, 1000 / 30)
    }

    return () => {
      if (id) {
        clearInterval(id)
      }
    }
  }, [forceUpdate, playState])

  return (
    <div css={{ position: 'relative' }}>
      <div
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          zIndex: 1,
        }}
      >
        <div
          css={{
            backgroundColor: 'var(--colors-background)',
            fontFamily: 'var(--fonts-secondary)',
            fontSize: shevy.h3.fontSize,
            lineHeight: 1,
            color: 'var(--colors-contra)',
            padding: bs(0.5),
          }}
        >
          Broken in prod, sorry! Will fix soon.
        </div>
      </div>
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
            <Item key={num} num={num} isHighlighted={idx.current === i} />
          ))}
        </Flex>
      </Flex>
    </div>
  )
}

const Item = React.memo(function Item({ num, isHighlighted }) {
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
})

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
