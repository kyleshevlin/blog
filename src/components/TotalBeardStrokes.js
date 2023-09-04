import React from 'react'
import { getValueRealtime } from '../firebase'
import Beard from './icons/Beard'
import { inflect } from '../utils'
import { Flex, useSpacing } from '@kyleshevlin/layout'

export default function TotalBeardStrokes({ slug }) {
  const bs = useSpacing()
  const [count, setCount] = React.useState(0)
  const [hasFetchedOnce, setHasFetchedOnce] = React.useState(false)

  React.useEffect(() => {
    async function fetchData() {
      getValueRealtime(`posts/${slug}`, snapshot => {
        const value = snapshot.val()
        setHasFetchedOnce(true)

        if (value) {
          setCount(value)
        }
      })
    }

    fetchData()
  }, [slug])

  return (
    <div
      css={{
        fontFamily: 'var(--fonts-secondary)',
        fontSize: '0.75em',
        marginLeft: bs(-0.25),
        marginTop: bs(-0.25),
        marginBottom: bs(1),
        opacity: hasFetchedOnce ? 1 : 0,
        transition: 'opacity .3s ease',

        '& svg': {
          display: 'block',
          fill: 'var(--colors-accent)',
          marginLeft: bs(0.25),
          marginRight: bs(0.25),
        },
      }}
    >
      <Flex align="center">
        <Beard width={20} />
        <div>
          {count} {inflect('stroke')(count)} bestowed
        </div>
      </Flex>
    </div>
  )
}
