import React, { Fragment } from 'react'
import { Link } from 'gatsby'

const postLinkStyles = {
  display: 'block',
  color: 'var(--colors-text)',
  '&:hover': {
    color: 'var(--colors-accent)',
  },
}

export default function PostHeader({ slug, subtitle, title }) {
  const Wrap = slug ? Link : Fragment
  const wrapProps = slug ? { css: postLinkStyles, to: slug } : {}

  return (
    <header>
      <Wrap {...wrapProps}>
        <h2 css={{ marginBottom: 0 }}>{title}</h2>
        {subtitle && (
          <h4 css={{ fontWeight: 700, marginBottom: 0 }}>{subtitle}</h4>
        )}
      </Wrap>
    </header>
  )
}
