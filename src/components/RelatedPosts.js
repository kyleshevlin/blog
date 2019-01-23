import React from 'react'
import { Link } from 'gatsby'
import { bs } from '../shevy'
import { inflect } from '../utils'

const RelatedPosts = ({ posts }) => (
  <div css={{ marginBottom: bs(4) }}>
    <hr />
    <p>
      If you enjoyed this post, you might also enjoy{' '}
      {inflect('this other related post.', 'these other related posts.')(posts)}
    </p>

    <div>
      {posts.map(({ slug, title }) => (
        <Link
          css={{ display: 'block', marginBottom: bs(0.5) }}
          key={slug}
          to={slug}
        >
          {title}
        </Link>
      ))}
    </div>
  </div>
)

export default RelatedPosts
