import React from 'react'
import { Link } from 'gatsby'
import { bs } from '../shevy'
import { inflect } from '../utils'

const RelatedPosts = ({ posts }) => (
  <div css={{ marginBottom: bs(2) }}>
    <div
      css={{
        fontFamily: 'var(--fonts-catamaran)',
        fontWeight: 'bold',
        marginBottom: bs(0.5),
      }}
    >
      Related {inflect('Post')(posts.length)}:
    </div>

    <div>
      {posts.map(({ slug, title }) => (
        <Link
          css={{ display: 'block', marginBottom: bs(0.5) }}
          dangerouslySetInnerHTML={{
            __html: title,
          }}
          key={slug}
          to={slug}
        />
      ))}
    </div>
  </div>
)

export default RelatedPosts
