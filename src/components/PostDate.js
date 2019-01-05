import React from 'react'
import styled from '@emotion/styled'
import { COLORS } from '../constants'
import { bs } from '../shevy'

const Outer = styled.div`
  margin-bottom: ${bs(0.75)};
`

const Inner = styled.div`
  display: inline-block;
  font-family: 'Catamaran', sans-serif;
  font-size: 0.75187rem;
  line-height: 1.8;
  padding-left: 2px;
  padding-right: 2px;
  border-bottom: 3px solid ${COLORS.teal};
`

const PostDate = ({ date }) => (
  <Outer>
    <Inner>{date}</Inner>
  </Outer>
)

export default PostDate
