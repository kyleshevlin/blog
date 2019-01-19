import React from 'react'
import { bs } from '../shevy'

const PostContent = ({ content }) => (
  <div
    css={{ marginBottom: bs() }}
    dangerouslySetInnerHTML={{ __html: content }}
  />
)

export default PostContent
