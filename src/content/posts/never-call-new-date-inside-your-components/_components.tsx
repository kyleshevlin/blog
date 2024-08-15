import React from 'react'
import { Input } from '../../../components/Inputs'

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
        id="form-1-date"
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
