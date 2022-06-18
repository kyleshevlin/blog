import React from 'react'
import { bs } from '../shevy'

export default function Margin({
  children,
  inline = false,
  all = 0,
  vert = 0,
  horz = 0,
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
}) {
  const margins = {
    ...(inline && { display: 'inline-block' }),
    ...(all && { margin: bs(all) }),
    ...(vert && { marginTop: bs(vert), marginBottom: bs(vert) }),
    ...(horz && { marginLeft: bs(horz), marginRight: bs(horz) }),
    ...(top && { marginTop: bs(top) }),
    ...(right && { marginRight: bs(right) }),
    ...(bottom && { marginBottom: bs(bottom) }),
    ...(left && { marginLeft: bs(left) }),
  }

  if (inline) {
    return <span css={margins}>{children}</span>
  }

  return <div css={margins}>{children}</div>
}
