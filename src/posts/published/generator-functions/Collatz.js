import React from 'react'
import Button from '../../../components/Button'
import { Input } from '../../../components/Inputs'
import { bs } from '../../../shevy'

const isOdd = n => Boolean(n % 2)

const collatz = n => (isOdd(n) ? 3 * n + 1 : n / 2)

function* collatzSequence(n) {
  if (isNaN(n)) return "Really? You know that's not a number, right?"
  if (n < 0) {
    return "Think you're tricky, huh? Keep it positive. Numberwise, at least."
  }

  if (n === 0) return n

  let current = n

  while (current !== 1) {
    yield current
    current = collatz(current)
  }

  return current
}

const initialValue = 17

export default function Collatz() {
  const [value, setValue] = React.useState(initialValue)
  const [sequence, setSequence] = React.useState([])
  const [done, setDone] = React.useState(false)
  const genRef = React.useRef(collatzSequence(Number(value)))

  const handleChange = e => {
    setValue(e.target.value)
  }

  const resetSequence = () => {
    setSequence([])
    setDone(false)
  }

  const hardReset = () => {
    const currentValue = Number(value)
    const nextValue =
      isNaN(currentValue) || currentValue < 0 ? initialValue : currentValue
    setValue(nextValue)
    genRef.current = collatzSequence(nextValue)
    resetSequence()
  }

  const softReset = () => {
    genRef.current = collatzSequence(Number(value))
    resetSequence()
  }

  React.useEffect(() => {
    softReset()
  }, [value])

  const handleNext = () => {
    const next = genRef.current.next()
    if (next.value !== undefined) {
      setSequence(s => [...s, next.value])
    }
    if (next.done) {
      setDone(true)
    }
  }

  return (
    <div>
      <h4 css={{ marginBottom: bs(0.5) }}>Collatz Sequencer</h4>
      <div css={{ marginBottom: bs(0.5) }}>
        <Input label="Starting Number" onChange={handleChange} value={value} />
      </div>
      <div
        css={{
          marginBottom: bs(0.5),
          'button + button': { marginLeft: bs(0.5) },
        }}
      >
        <Button onClick={handleNext} disabled={done}>
          Next
        </Button>
        <Button onClick={hardReset}>Reset</Button>
      </div>
      {sequence.length ? <div>{sequence.join(' -> ')}</div> : null}
    </div>
  )
}
