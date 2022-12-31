import React from 'react'
import { Flex } from '@kyleshevlin/layout'
import { bs } from '../../../shevy'

export default function ResizableBox() {
  const [width, setWidth] = React.useState(50)
  const [height, setHeight] = React.useState(50)

  return (
    <div
      css={{
        backgroundColor: 'var(--colors-offset)',
        fontFamily: 'var(--fonts-catamaran)',
        padding: bs(),
      }}
    >
      <Flex direction="column" gap={1}>
        <Flex justify="space-around">
          <label css={{ textAlign: 'center' }}>
            <div>Width</div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={width}
              onChange={e => {
                setWidth(Number(e.target.value))
              }}
            />
          </label>
          <label css={{ textAlign: 'center' }}>
            <div>Height</div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={height}
              onChange={e => {
                setHeight(Number(e.target.value))
              }}
            />
          </label>
        </Flex>
        <div css={{ height: bs(8), position: 'relative' }}>
          <div
            css={{
              width: `${width}%`,
              height: `${height}%`,
              backgroundColor: 'var(--colors-accent)',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      </Flex>
    </div>
  )
}
