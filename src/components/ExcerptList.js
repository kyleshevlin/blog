import React from 'react'
import ExcerptedPost from '../components/ExcerptedPost'
import { bs } from '../shevy'

export default function ExcerptList({ posts }) {
  return (
    <ul
      css={{
        listStyle: 'none',

        '> li': {
          marginBottom: 0,

          '+ li': {
            marginTop: bs(3),
          },
        },
      }}
    >
      {posts.map(post => (
        <li key={post.frontmatter.slug}>
          <ExcerptedPost post={post} />
        </li>
      ))}
    </ul>
  )
}
