import createShevy from 'shevyjs'

const shevy = createShevy({
  baseFontSize: '1rem',
  baseLineHeight: 1.8,
  fontScale: [2.4414, 1.9531, 1.5625, 1.25, 1, 1],
  includeMarginBottom: true,
  precision: 4,
  proximity: 0.85,
})

export const bs = shevy.baseSpacing

export default shevy
