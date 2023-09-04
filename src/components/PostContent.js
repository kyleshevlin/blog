import { useSpacing } from '@kyleshevlin/layout'
import React from 'react'

const PostContent = ({ content }) => {
  const bs = useSpacing()

  return (
    <div
      css={{ marginBottom: bs(1) }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default PostContent
