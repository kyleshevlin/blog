import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Container from './Container'
import Nav from './Nav'

const Header = ({ subTitle, title }) => (
  <header>
    <Container>
      <Link to="/" style={{ display: 'block' }}>
        <h1>{title}</h1>
        <div>{subTitle}</div>
      </Link>
      <Nav />
    </Container>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ''
}

export default Header
