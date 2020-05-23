import React from 'react'
import ExcerptedPost from '../components/ExcerptedPost'

export default function ExcerptList({ posts }) {
  return (
    <div>
      {posts.map(post => (
        <ExcerptedPost key={post.frontmatter.slug} post={post} />
      ))}
    </div>
  )
}
