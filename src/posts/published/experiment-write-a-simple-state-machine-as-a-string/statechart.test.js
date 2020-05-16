import statechart from './statechart'

describe('statechart', () => {
  it('should derive an `id` from the first line', () => {
    const chart = statechart(`
      lightBulb
    `)
    expect(chart.id).toEqual('lightBulb')
  })

  it('should derive an `initial` state from the second line', () => {
    const chart = statechart(`
      lightBulb
      unlit
    `)
    expect(chart.initial).toEqual('unlit')
  })

  it('should derive the `states` from the rest of the lines', () => {
    const chart = statechart(`
      lightBulb
      unlit
      lit unlit TOGGLE
      unlit lit TOGGLE
      lit broken BREAK
      unlit broken BREAK
    `)

    expect(chart.states).toEqual({
      lit: {
        on: {
          TOGGLE: 'unlit',
          BREAK: 'broken',
        },
      },
      unlit: {
        on: {
          TOGGLE: 'lit',
          BREAK: 'broken',
        },
      },
      broken: {},
    })
  })
})
