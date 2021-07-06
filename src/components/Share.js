import React from 'react'
import shevy, { bs } from '../shevy'

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
    <button
      css={{
        backgroundColor: 'var(--colors-contra)',
        border: 'none',
        borderRadius: 2,
        color: 'white',
        fontFamily: 'var(--fonts-catamaran)',
        fontSize: shevy.h4.fontSize,
        padding: `${bs(0.35)} ${bs(0.5)}`,
        transition: 'all .3s ease',
        width: '100%',

        '&:hover': {
          backgroundColor: 'var(--colors-contraLight)',
        },
      }}
      onClick={handleClick}
    >
      Click to share on Twitter
    </button>
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
