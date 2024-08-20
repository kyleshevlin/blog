import React from 'react'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Inputs'
import { ShiftBy } from '../../../components/ShiftBy'

function Wrap({ children }: { children: React.ReactNode }) {
  return <div className="bg-gray-100 p-4 dark:bg-gray-800">{children}</div>
}

function formatDate(date: Date) {
  return date.toISOString().split('T')[0]
}

export function Form1() {
  const today = formatDate(new Date())
  const [date, setDate] = React.useState(today)

  return (
    <Wrap>
      <Input
        label="Date"
        type="date"
        onChange={e => {
          setDate(e.target.value)
        }}
        value={date}
      />
    </Wrap>
  )
}

const rollDice = (randomizer = Math.random) => Math.ceil(randomizer() * 6)

const NUM_TO_DICE_ASCII: Record<number, string> = {
  1: '⚀',
  2: '⚁',
  3: '⚂',
  4: '⚃',
  5: '⚄',
  6: '⚅',
}

export function DiceRoll({
  initialState = 1,
  randomizer = Math.random,
}: {
  initialState?: number
  randomizer?: () => number
}) {
  const [state, setState] = React.useState(initialState ?? rollDice(randomizer))

  const roll = React.useCallback(() => {
    setState(rollDice(randomizer))
  }, [randomizer])

  return (
    <Wrap>
      <div className="isolate z-10 flex flex-col items-center gap-4">
        <div className="z-10">
          <Button onClick={roll}>Roll</Button>
        </div>

        <ShiftBy y={-10}>
          <div className="text-[100px] leading-[0.75em]">
            {NUM_TO_DICE_ASCII[state]}
          </div>
        </ShiftBy>
      </div>
    </Wrap>
  )
}
