const WIDTH = 20
const HEIGHT = 14
const CX = WIDTH / 3
const CY = HEIGHT / 2
const RADIUS = 2

const dPath = `
M0,${HEIGHT / 3}
${WIDTH / 4},0
${WIDTH},0
${WIDTH},${HEIGHT}
${WIDTH / 4},${HEIGHT}
0,${(2 * HEIGHT) / 3}Z

M${CX - RADIUS},${CY - RADIUS}
Q${CX - RADIUS},${CY - RADIUS} ${CX},${CY - RADIUS}
Q${CX + RADIUS},${CY - RADIUS} ${CX + RADIUS},${CY}
Q${CX + RADIUS},${CY + RADIUS} ${CX},${CY + RADIUS}
Q${CX - RADIUS},${CY + RADIUS} ${CX - RADIUS},${CY}Z
`

export function TagReact() {
  return (
    <svg
      fill="none"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width={WIDTH}
      height={HEIGHT}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="currentColor" fillRule="evenodd" d={dPath}></path>
    </svg>
  )
}
