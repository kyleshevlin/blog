import React from 'react'
import { Link } from 'gatsby'
import shevy from '../shevy'
import { formatStrForPath } from '../utils'
import Tag from './icons/Tag'
import { Flex, useSpacing } from '@kyleshevlin/layout'

const formatItemPath = item => `/tags/${formatStrForPath(item)}`

export default function PostTags({ items }) {
  const bs = useSpacing()

  return items && items.length ? (
    <Flex align="baseline" gap={0.5} wrap="wrap">
      <div>
        <span
          css={{
            display: 'inline-block',
            lineHeight: 1,
            verticalAlign: 'middle',
            marginRight: bs(0.25),

            '> svg': {
              display: 'block',
            },
          }}
        >
          <Tag fill={'var(--colors-offsetMore)'} />
        </span>
        <span
          css={{
            fontFamily: 'var(--fonts-secondary)',
            fontSize: '0.75em',
            lineHeight: shevy.baseLineHeight,
          }}
        >
          Tags
        </span>
      </div>
      {items.map(item => (
        <Link
          css={{ fontFamily: 'var(--fonts-secondary)' }}
          key={item}
          to={formatItemPath(item)}
        >
          {item}
        </Link>
      ))}
    </Flex>
  ) : null
}
