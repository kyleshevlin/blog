export default function statechart(string) {
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
      event
    }))

  const states = stateNodes.reduce((acc, cur) => {
    const { start, end, event } = cur

    // check if this starting node is in `acc` yet
    if (!acc[start]) {
      acc[start] = {}
    }

    // check if `end` is a state yet
    if (!acc[end]) {
      acc[end] = {}
    }

    // add the empty `on` object if it doesn't exist
    if (!acc[start].on) {
      acc[start].on = {}
    }

    // Add the event and transition here, spread any previous
    // [event]: end key/value pairs
    acc[start].on = {
      ...acc[start].on,
      [event]: end
    }

    return acc
  }, {})

  return {
    id,
    initial,
    states
  }
}
