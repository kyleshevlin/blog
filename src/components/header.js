import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { COLORS } from '../constants'
import { bs } from '../shevy'
import Container from './Container'
import Nav from './Nav'

const Wrap = styled.header`
  padding-top: ${bs()};
  padding-bottom: ${bs()};
  margin-bottom: ${bs()};
`

const HeadingWrap = styled(Link)`
  color: ${COLORS.black};
  display: block;
`

const Title = styled.h1`
  line-height: 1;
  margin-bottom: 0;
`

const Subtitle = styled.div`
  font-size: 1rem;
  margin-bottom: 0;
`

const Header = ({ subTitle, title }) => (
  <Wrap>
    <Container>
      <HeadingWrap to="/">
        <Title>{title}</Title>
        <Subtitle>{subTitle}</Subtitle>
      </HeadingWrap>
      <Nav />
    </Container>
  </Wrap>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ''
}

export default Header
