import React from 'react'

export default function ResizableBox() {
  const [width, setWidth] = React.useState(50)
  const [height, setHeight] = React.useState(50)

  return (
    <div className="bg-gray-100 p-4 font-sans dark:bg-gray-800">
      <div className="flex flex-col gap-4">
        <div className="flex justify-around">
          <label className="text-center">
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
          <label className="text-center">
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
        </div>
        <div className="relative h-64">
          <div
            className="bg-accent"
            style={{
              width: `${width}%`,
              height: `${height}%`,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
