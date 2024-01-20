export default function statechart(string: string) {
  const parsedStrings = string
    .split(/\n/)
    .map(s => s.trim())
    .filter(Boolean)

  const [id, initial, ...stateStrings] = parsedStrings

  const stateNodes = stateStrings
    .map(s => s.split(' '))
    .map(([start, end, event]) => ({
      start,
      end,
      event,
    }))

  const states = {} as Record<string, { on?: Record<string, string> }>

  stateNodes.forEach(node => {
    const { start, end, event } = node

    // check if this starting node is in `states` yet
    if (!states[start]) {
      states[start] = {
        on: {},
      }
    }

    // check if `end` is a state yet
    if (!states[end]) {
      states[end] = {}
    }

    // Add the event and transition here, spread any previous
    // [event]: end key/value pairs
    states[start].on = {
      ...states[start].on,
      [event]: end,
    }
  })

  return {
    id,
    initial,
    states,
  }
}
