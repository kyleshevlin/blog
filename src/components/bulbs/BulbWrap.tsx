import React from 'react'
import { Button } from '../Button'

interface Props<State> {
  children: React.ReactNode
  colors?: string[]
  events?: string[]
  send: (value: unknown) => void
  state?: State
  title: string
}

export function BulbWrap<State>({
  children,
  title,
  state,
  events = [],
  colors = [],
  send,
}: Props<State>) {
  return (
    <div className="flex flex-col gap-4 rounded border-2 border-accent p-8">
      <h4 className="font-sans">{title}</h4>

      <div className="flex justify-center">
        <div className="w-1/2 max-w-[240px] text-black dark:text-gray-700">
          {children}
        </div>
      </div>

      <pre className="bg-gray-100 dark:bg-gray-800">
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>

      {events.length > 0 && (
        <div className="flex flex-col gap-2">
          <div>Events</div>
          <div className="flex gap-2">
            {events.map(event => (
              <Button key={event} onClick={() => send(event)}>
                {event}
              </Button>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <div>Change Colors</div>
          <div className="flex gap-2">
            {colors.map(color => (
              <Button
                key={color}
                onClick={() => send({ type: 'CHANGE_COLOR', color })}
              >
                {color}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
