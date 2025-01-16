import React from 'react'
import { ShiftBy } from '../../../components/ShiftBy'

const items = [0, 1, 2, 3, 4, 5, 6, 7]

export function SlidingWindowVisual() {
  const [start, setStart] = React.useState(0)
  const [end, setEnd] = React.useState(0)
  const dirtyBit = React.useRef(true)

  const beforeWindow = items.slice(0, start)
  const inWindow = items.slice(start, end + 1)
  const afterWindow = items.slice(end + 1)

  React.useEffect(() => {
    const id = setInterval(() => {
      if (dirtyBit.current) {
        // get the next end
        const nextEnd = (end + 1) % items.length

        // if it's zero, we wrapped around and need to reset
        if (nextEnd === 0) {
          setEnd(0)
          setStart(0)
          return
        }

        // if we get to far from the start, let's flip it and start advancing it
        if (nextEnd - start > 2) {
          dirtyBit.current = false
        }

        // set the next end
        setEnd(nextEnd)
      } else {
        // get the next start
        const nextStart = start + 1

        // if the nextStart is equal to the end, we want to advance the end again
        if (nextStart === end) {
          dirtyBit.current = true
        }

        // set the next start
        setStart(nextStart)
      }
    }, 1000)

    return () => clearInterval(id)
  }, [end, start])

  return (
    <div className="stack items-center gap-4 py-2">
      <div className="row justify-center gap-4 py-2">
        {beforeWindow.length > 0 &&
          beforeWindow.map(item => <Item key={item}>{item}</Item>)}

        <div className="row -m-2 justify-between gap-4 rounded p-2 outline outline-2 outline-pink-500">
          {inWindow.map(item => (
            <Item key={item}>{item}</Item>
          ))}
        </div>

        {afterWindow.length > 0 &&
          afterWindow.map(item => <Item key={item}>{item}</Item>)}
      </div>

      <div className="font-sans">A mock visual of the sliding window</div>
    </div>
  )
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <div className="stack h-8 w-8 items-center justify-center rounded bg-accent font-mono leading-none text-white md:h-16 md:w-16">
      <ShiftBy y={1}>{children}</ShiftBy>
    </div>
  )
}
