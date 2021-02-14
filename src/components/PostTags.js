import React from 'react'
import { Link } from 'gatsby'
import shevy, { bs } from '../shevy'
import { formatStrForPath, v } from '../utils'
import Tag from './icons/Tag'

const formatItemPath = item => `tags/${formatStrForPath(item)}`

export default function PostTags({ items }) {
  return items && items.length ? (
    <>
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
          <Tag fill={v('colors-offsetMore')} />
        </span>
        <span
          css={{
            fontFamily: v('fonts-catamaran'),
            fontSize: '0.75em',
            lineHeight: shevy.baseLineHeight,
          }}
        >
          Tags
        </span>
      </div>
      <div css={{ display: 'flex', flexWrap: 'wrap', gap: bs(0.5) }}>
        {items.map(item => (
          <Link
            css={{ fontFamily: v('fonts-catamaran'), fontSize: '.85rem' }}
            key={item}
            to={formatItemPath(item)}
          >
            {item}
          </Link>
        ))}
      </div>
    </>
  ) : null
}
