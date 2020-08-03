import React from 'react'
import { newTicTacToeGrid } from './utils'
import Grid from './Grid'
import { FirstCell } from './Cell'

const grid = newTicTacToeGrid()

export default function BlankGrid() {
  return (
    // I can use `textAlign` because the underlying div is of `inline-block`
    <div style={{ textAlign: 'center' }}>
      <Grid Cell={FirstCell} grid={grid} />
    </div>
  )
}
