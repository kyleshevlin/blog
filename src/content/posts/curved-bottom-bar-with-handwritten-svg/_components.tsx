const WIDTH = 320
const HEIGHT = 48
const CORNER_RADIUS = 12
const CUTOUT_RADIUS = 30
const CUTOUT_LEFT_X = WIDTH / 2 - CUTOUT_RADIUS
const CUTOUT_RIGHT_X = WIDTH / 2 + CUTOUT_RADIUS

export const CURVED_TAB_BAR_D = `
M0,${HEIGHT}
L0,${CORNER_RADIUS}
Q0,0
${CORNER_RADIUS},0
L${CUTOUT_LEFT_X},0
A${CUTOUT_RADIUS},${CUTOUT_RADIUS} 0 0 0 ${CUTOUT_RIGHT_X},0
L${WIDTH - CORNER_RADIUS},0
Q${WIDTH},0
${WIDTH},${CORNER_RADIUS}
L${WIDTH},${HEIGHT}
Z
`

export function Shape({ d = CURVED_TAB_BAR_D }: { d?: string }) {
  return (
    <svg fill="currentColor" width={WIDTH} height={HEIGHT}>
      <path d={d} />
    </svg>
  )
}
