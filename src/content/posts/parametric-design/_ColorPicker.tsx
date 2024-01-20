import React from 'react'

const MAX_HEX = parseInt('ffffff', 16)

export default function ColorPicker() {
  const [backgroundColor, setBackgroundColor] = React.useState('#ff6347')
  // Very imperfect way to try and keep the label text legible as the
  // background color changes
  const textColor =
    parseInt(backgroundColor.replace('#', ''), 16) > MAX_HEX * 0.75
      ? '#111'
      : '#fff'

  return (
    <div
      className="flex h-64 items-center justify-center font-sans transition-all"
      style={{ backgroundColor, color: textColor }}
    >
      <label className="flex flex-col items-center gap-2">
        <div>Choose a color</div>
        <div>
          <input
            onChange={e => {
              setBackgroundColor(e.target.value)
            }}
            type="color"
            value={backgroundColor}
          />
        </div>
      </label>
    </div>
  )
}
