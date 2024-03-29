import { Button } from '../../../components/Button'

export function CounterUI({
  count,
  increment,
  decrement,
  reset,
}: {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-sans">Count: {count}</div>
      <div className="flex gap-2">
        <Button onClick={increment}>+1</Button>
        <Button onClick={decrement}>-1</Button>
        <Button onClick={reset}>reset</Button>
      </div>
    </div>
  )
}
