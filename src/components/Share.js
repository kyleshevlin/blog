import React from 'react'
import shevy, { bs } from '../shevy'
import ShiftBy from './ShiftBy'
import Spacer from './Spacer'

const generateText = title => encodeURIComponent(`Check out "${title}"`)
const generateUrl = slug =>
  encodeURIComponent(`https://kyleshevlin.com/${slug}`)

export default function Share({ slug, title }) {
  const handleClick = React.useCallback(() => {
    popupWindow(
      `https://twitter.com/intent/tweet?text=${generateText(
        title
      )}&url=${generateUrl(slug)}&via=kyleshevlin`,
      'Share this post',
      window,
      600,
      400
    )
  }, [slug, title])

  return (
    <div css={{ width: '100%', textAlign: 'center' }}>
      <Spacer bottom={0.25}>
        <div
          css={{
            fontFamily: 'var(--fonts-catamaran)',
          }}
        >
          Sharing this post on Twitter & elsewhere is a great way to
          help&nbsp;me&nbsp;out
        </div>
      </Spacer>
      <button
        css={{
          backgroundColor: 'var(--colors-contra)',
          border: 'none',
          borderRadius: 2,
          color: 'white',
          fontFamily: 'var(--fonts-catamaran)',
          fontSize: shevy.h4.fontSize,
          lineHeight: 1,
          padding: `${bs(0.35)} ${bs(0.5)}`,
          transition: 'all .3s ease',
          width: '100%',
          height: 56,

          '&:hover': {
            backgroundColor: 'var(--colors-contraLight)',
          },
        }}
        onClick={handleClick}
      >
        <ShiftBy y={-2}>Click to share on Twitter</ShiftBy>
      </button>
    </div>
  )
}

// https://stackoverflow.com/a/32261263/2347675
function popupWindow(url, title, win, w, h) {
  const y = win.top.outerHeight / 2 + win.top.screenY - h / 2
  const x = win.top.outerWidth / 2 + win.top.screenX - w / 2

  return win.open(
    url,
    title,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`
  )
}
