import React from 'react'
import styled from '@emotion/styled'
import { bs } from '../shevy'

const Content = styled.div`
  margin-bottom: ${bs()};
`

const PostContent = ({ content }) => (
  <Content dangerouslySetInnerHTML={{ __html: content }} />
)

export default PostContent
