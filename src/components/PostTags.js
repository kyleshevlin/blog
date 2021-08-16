import React from 'react'
import { Link } from 'gatsby'
import shevy, { bs } from '../shevy'
import { formatStrForPath } from '../utils'
import Tag from './icons/Tag'
import Spacer from './Spacer'

const formatItemPath = item => `/tags/${formatStrForPath(item)}`

export default function PostTags({ items }) {
  return items && items.length ? (
    <>
      <Spacer bottom={0.25}>
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
            fontFamily: 'var(--fonts-catamaran)',
            fontSize: '0.75em',
            lineHeight: shevy.baseLineHeight,
          }}
        >
          Tags
        </span>
      </Spacer>
      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          '> a': {
            marginRight: bs(0.5),
            marginBottom: bs(0.25),
          },
        }}
      >
        {items.map(item => (
          <Link
            css={{ fontFamily: 'var(--fonts-catamaran)' }}
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
