import React from 'react'
import { Input, useNumberInput } from '../../../components/Inputs'

export function Example() {
  const [height, setHeight] = useNumberInput(25)

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4 dark:border-gray-700">
      <div className="flex justify-center">
        <Input
          type="range"
          min="15"
          max="35"
          label="Adjust Outer Height"
          onChange={setHeight}
          value={height}
          variant="block"
        />
      </div>

      <div
        className="rounded bg-gray-100 p-4 font-sans text-white dark:bg-gray-800"
        style={{ height: `${height}rem` }}
      >
        <div className="flex min-h-full flex-col gap-2">
          <header className="rounded bg-accent p-4">Header</header>
          <main className="grow rounded bg-accent p-4">Main</main>
          <footer className="rounded bg-accent p-4">Footer</footer>
        </div>
      </div>
    </div>
  )
}
