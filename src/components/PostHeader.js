import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import { COLORS } from '../constants'
import { bs } from '../shevy'

const postLinkStyles = {
  display: 'block',
  color: COLORS.black,
  '&:hover': {
    color: COLORS.teal
  }
}

const PostHeader = ({ slug, subtitle, title }) => {
  const Wrap = slug ? Link : Fragment
  const wrapProps = slug ? { css: postLinkStyles, to: slug } : {}

  return (
    <header css={{ marginBottom: bs() }}>
      <Wrap {...wrapProps}>
        <h2 css={{ marginBottom: 0 }}>{title}</h2>
        {subtitle && (
          <h4 css={{ fontWeight: 700, marginBottom: 0 }}>{subtitle}</h4>
        )}
      </Wrap>
    </header>
  )
}

export default PostHeader
