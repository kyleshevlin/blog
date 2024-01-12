import React from 'react'
import { useSpacing } from '@kyleshevlin/layout'

export function Agathist() {
  const bs = useSpacing()

  return (
    <a
      css={{
        '--name-background-pos': 'left',
        '--surprise-color': 'white',
        alignItems: 'center',
        background: 'rgb(15 23 42)',
        borderRadius: 8,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: bs(0.5),
        justifyContent: 'center',
        padding: bs(1),
        textAlign: 'center',
        transition: 'all .3s ease',

        '&:hover': {
          '--name-background-pos': 'right',
          '--surprise-color': '#ec4899',
          color: 'white',
        },
      }}
      href="https://agath.ist"
      target="_blank"
      rel="noreferrer"
    >
      <span
        css={{
          backgroundImage: 'linear-gradient(90deg, #f43f5e, #ec4899, #fb923c)',
          backgroundClip: 'text',
          backgroundPositionX: 'var(--name-background-pos)',
          backgroundSize: '200%',
          color: 'transparent',
          fontFamily: 'system-ui',
          fontSize: '2.75rem',
          fontWeight: 'bold',
          transition: 'all .6s ease',
        }}
      >
        Agathist
      </span>
      <span>
        Good software by good people.{' '}
        <span
          css={{ color: 'var(--surprise-color)', transition: 'color .3s ease' }}
        >
          Click here
        </span>{' '}
        to learn more.
      </span>
    </a>
  )
}
