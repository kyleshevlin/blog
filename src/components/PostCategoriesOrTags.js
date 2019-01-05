import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { lighten } from 'polished'
import { COLORS } from '../constants'
import { bs } from '../shevy'

const Wrap = styled.div`
  margin-bottom: ${bs()};
`

const Heading = styled.div`
  font-family: 'Catamaran', sans-serif;
  font-size: 0.75rem;
  line-height: 1.8;
`

const ItemLink = styled(Link)`
  display: inline-block;
  height: 24px;
  background-color: ${COLORS.teal};
  color: ${COLORS.white};
  font-family: 'Catamaran', sans-serif;
  font-size: 0.75rem;
  line-height: 24px;
  padding-left: ${bs(0.5)};
  padding-right: ${bs(0.5)};
  margin-right: ${bs(0.25)};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${lighten(0.1, COLORS.teal)};
    color: ${COLORS.white};
  }
`

const formatItemPath = (item, type) => {
  const paths = {
    category: 'categories',
    tag: 'tags'
  }
  const typePath = paths[type]
  const itemSlug = item
    .toLowerCase()
    .split(' ')
    .join('-')

  return `${typePath}/${itemSlug}`
}

const getTypeHeading = type => {
  const headings = {
    category: 'Categories',
    tag: 'Tags'
  }

  return headings[type]
}

const PostCategoriesOrTags = ({ items, type }) => (
  <Wrap>
    <Heading>{getTypeHeading(type)}:</Heading>
    {items.map(item => (
      <ItemLink key={item} to={formatItemPath(item, type)}>
        {item}
      </ItemLink>
    ))}
  </Wrap>
)

export default PostCategoriesOrTags
