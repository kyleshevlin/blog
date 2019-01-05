import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { COLORS } from '../constants'
import { bs } from '../shevy'

const Header = styled.header`
  margin-bottom: ${bs()};
`

const PostLink = styled(Link)`
  display: block;
  color: ${COLORS.black};

  &:hover {
    color: ${COLORS.teal};
  }
`

const Title = styled.h2`
  margin-bottom: 0;
`

const Subtitle = styled.h4`
  margin-bottom: 0;
  font-weight: 700;
`

const PostHeader = ({ slug, subtitle, title }) => {
  const Wrap = slug ? PostLink : Fragment
  const wrapProps = slug ? { to: slug } : {}

  return (
    <Header>
      <Wrap {...wrapProps}>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Wrap>
    </Header>
  )
}

export default PostHeader
