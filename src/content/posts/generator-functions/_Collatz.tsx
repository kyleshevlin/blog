import React from 'react'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Inputs'

const isOdd = (n: number) => Boolean(n % 2)

const collatz = (n: number) => (isOdd(n) ? 3 * n + 1 : n / 2)

function* collatzSequence(n: number) {
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
  const [sequence, setSequence] = React.useState<(string | number)[]>([])
  const [done, setDone] = React.useState(false)
  const genRef = React.useRef(collatzSequence(Number(value)))

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

  const softReset = React.useCallback(() => {
    genRef.current = collatzSequence(Number(value))
    resetSequence()
  }, [value])

  React.useEffect(() => {
    softReset()
  }, [softReset])

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
    <div className="flex flex-col gap-4 font-sans">
      <h4 className="text-lg font-bold">Collatz Sequencer</h4>

      <p className="max-w-[50ch]">
        Choose a starting number and type it into the input. Then click the
        &ldquo;Next&rdquo; button to generate the sequence.
      </p>

      <div className="flex items-end gap-4">
        <Input
          label="Starting Number"
          onChange={e => {
            setValue(Number(e.target.value))
          }}
          value={value}
          variant="block"
        />

        <div className="flex gap-2">
          <Button onClick={handleNext} disabled={done}>
            Next
          </Button>

          <Button onClick={hardReset}>Reset</Button>
        </div>
      </div>

      {sequence.length ? <div>{sequence.join(' -> ')}</div> : null}
    </div>
  )
}
