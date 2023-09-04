import React from 'react'
import { Link } from 'gatsby'
import shevy from '../shevy'
import { inflect } from '../utils'
import { useSpacing } from '@kyleshevlin/layout'

const RelatedPosts = ({ posts }) => {
  const bs = useSpacing()

  return (
    <div>
      <div
        css={{
          fontFamily: 'var(--fonts-secondary)',
          fontWeight: 'bold',
          marginBottom: bs(0.5),
        }}
      >
        Related {inflect('Post')(posts.length)}:
      </div>

      <div>
        {posts.map(({ slug, title }) => (
          <Link
            css={{
              display: 'block',
              lineHeight: shevy.baseLineHeight * shevy.proximityFactor,
              marginBottom: bs(0.5),
            }}
            dangerouslySetInnerHTML={{
              __html: title,
            }}
            key={slug}
            to={`/${slug}`}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedPosts
