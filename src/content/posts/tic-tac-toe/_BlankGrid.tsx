import React from 'react'
import { newTicTacToeGrid } from './_utils'
import Grid from './_Grid'
import { FirstCell } from './_Cell'

const grid = newTicTacToeGrid()

export default function BlankGrid() {
  return (
    // I can use `textAlign` because the underlying div is of `inline-block`
    <div className="text-center">
      <Grid Cell={FirstCell} grid={grid} />
    </div>
  )
}
