import Shevy from 'shevyjs'

const shevy = new Shevy({
  baseFontSize: '1rem',
  baseLineHeight: 1.8,
  baseFontScale: [2.4414, 1.9531, 1.5625, 1.25, 1, 1],
  addMarginBottom: true,
  proximity: true,
  proximityFactor: 0.85
})

export const bs = shevy.baseSpacing

export default shevy
