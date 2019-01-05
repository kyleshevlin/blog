import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { COLORS } from '../constants'
import { bs } from '../shevy'

const Wrap = styled.div`
  margin-bottom: ${bs(2)};
`

const DateWrap = styled.div`
  margin-bottom: ${bs()};
`

const Date = styled.div`
  display: inline-block;
  padding-left: 2px;
  padding-right: 2px;
  border-bottom: 3px solid ${COLORS.teal};
`

const PostHeader = styled.header`
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
  margin-bottom: ${bs(0.5)};
`

const Subtitle = styled.h4`
  margin-bottom: 0;
`

const Content = styled.div`
  margin-bottom: ${bs()};
`

const CatsOrTagsWrap = styled.div`
  margin-bottom: ${bs()};
`

const CatsOrTagsHeading = styled.div`
  font-size: 0.75rem;
`

const CatsOrTagsLink = styled(Link)`
  display: inline-block;
  height: 24px;
  background-color: ${COLORS.teal};
  color: ${COLORS.white};
  font-size: 0.75rem;
  line-height: 24px;
  padding-left: ${bs(0.5)};
  padding-right: ${bs(0.5)};
  margin-right: ${bs(0.25)};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${COLORS.black};
  }
`

const ExcerptedPost = ({ post }) => {
  const {
    excerpt,
    frontmatter: { categories, date, slug, subtitle, tags, title }
  } = post

  return (
    <Wrap>
      <DateWrap>
        <Date>{date}</Date>
      </DateWrap>

      <PostHeader>
        <PostLink to={slug}>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </PostLink>
      </PostHeader>

      <Content dangerouslySetInnerHTML={{ __html: excerpt }} />

      {categories && (
        <CatsOrTagsWrap>
          <CatsOrTagsHeading>Categories:</CatsOrTagsHeading>
          {categories.map(cat => (
            <CatsOrTagsLink
              key={cat}
              to={`categories/${cat
                .toLowerCase()
                .split(' ')
                .join('-')}`}
            >
              {cat}
            </CatsOrTagsLink>
          ))}
        </CatsOrTagsWrap>
      )}

      {tags && (
        <CatsOrTagsWrap>
          <CatsOrTagsHeading>Tags:</CatsOrTagsHeading>
          {tags.map(tag => (
            <CatsOrTagsLink
              key={tag}
              to={`tags/${tag
                .toLowerCase()
                .split(' ')
                .join('-')}`}
            >
              {tag}
            </CatsOrTagsLink>
          ))}
        </CatsOrTagsWrap>
      )}
    </Wrap>
  )
}

export default ExcerptedPost
