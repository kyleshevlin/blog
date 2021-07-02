import React from 'react'
import { bs } from '../shevy'

const generateText = title => encodeURIComponent(`Check out "${title}"`)
const generateUrl = slug =>
  encodeURIComponent(`https://kyleshevlin.com/${slug}`)

export default function Share({ slug, title }) {
  const handleClick = () => {
    popupWindow(
      `https://twitter.com/intent/tweet?text=${generateText(
        title
      )}&url=${generateUrl(slug)}&via=kyleshevlin`,
      'Share this post',
      window,
      600,
      400
    )
  }

  return (
    <div
      css={{
        margin: `${bs(3)} auto`,
        textAlign: 'center',
        width: '75%',
      }}
    >
      <button
        css={{
          backgroundColor: 'var(--components-share-background)',
          border: 'none',
          fontFamily: 'var(--fonts-catamaran)',
          fontSize: '1.5em',
          marginBottom: bs(0.5),
          padding: bs(),
          transition: 'all .3s ease',
          width: '100%',

          '&:hover': {
            backgroundColor: 'var(--components-share-hover-background)',
          },
        }}
        onClick={handleClick}
      >
        <span
          css={{
            backgroundColor: 'var(--colors-contra)',
            borderRadius: 4,
            color: 'white',
            display: 'inline-block',
            padding: `0 ${bs(0.35)}`,
            transition: 'background-color .3s ease',

            '&:hover': {
              backgroundColor: 'var(--colors-contraLight)',
            },
          }}
        >
          Click here
        </span>{' '}
        to share this article with your friends on&nbsp;
        <span css={{ color: 'var(--colors-accent)', fontWeight: 'bold' }}>
          Twitter
        </span>
      </button>
      <div css={{ fontSize: '.85rem', paddingLeft: bs(), paddingRight: bs() }}>
        Sharing this article on Twitter is a great way to help me out and I
        really appreciate the support.
      </div>
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
