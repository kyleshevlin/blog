import React from 'react'

const Beard = ({ width }) => (
  <svg width={width} viewBox="0 0 647 593">
    <g fillRule="evenodd">
      <path d="M1,50 L18,12 L23,81 L44,144 L131,189 L194,181 L299,130 L334,142 L359,136 L491,186 L551,168 L622,100 L627,0 L647,30 L647,275 L617,351 L543,472 L468,580 L327,593 L193,579 L131,502 L74,406 L10,270 L1,50 Z M309,208 L218,236 L200,271 L211,331 L266,362 L291,352 L266,315 L276,268 L333,290 L378,270 L410,309 L378,350 L386,359 L407,361 L459,286 L434,237 L348,209 L309,208 Z" />
    </g>
  </svg>
)

Beard.defaultProps = {
  width: 50,
}

export default Beard
