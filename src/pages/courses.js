import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Seo from '../components/Seo'
import { BREAKPOINTS, EGGHEAD_AFFILIATE_QUERY_PARAM } from '../constants'
import { bs } from '../shevy'
import { createMediaQuery, getNodes } from '../utils'
import LinkButton from '../components/LinkButton'
import NewsletterCTA from '../components/NewsletterCTA'

const query = graphql`
  {
    allCoursesJson(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          date(formatString: "MM-DD-YYYY")
          title
          description
          logo {
            id
            childImageSharp {
              original {
                src
              }
            }
          }
          url
        }
      }
    }
  }
`

export default function Courses() {
  const data = useStaticQuery(query)
  const courses = getNodes(data.allCoursesJson)

  return (
    <>
      <Seo title="Courses" keywords={['Courses', 'Kyle Shevlin']} />
      <h1>Courses</h1>
      <div css={{ marginTop: bs(2), marginBottom: bs(4) }}>
        {courses.map(course => (
          <CourseItem key={course.title} {...course} />
        ))}
      </div>

      <NewsletterCTA />
    </>
  )
}

const BUTTON_TEXT_BY_URL_TYPE = {
  default: 'View the course',
  egghead: 'View on egghead.io',
  podia: 'View on Podia',
}

function getUrlType(url) {
  switch (true) {
    case /egghead/g.test(url):
      return 'egghead'

    case /podia/g.test(url):
      return 'podia'

    default:
      return 'default'
  }
}

function formatUrl(url, urlType) {
  if (urlType === 'egghead') {
    return url + EGGHEAD_AFFILIATE_QUERY_PARAM
  }

  return url
}

function CourseItem({ description, logo, title, url }) {
  const urlType = getUrlType(url)
  const formattedUrl = formatUrl(url, urlType)

  return (
    <div
      css={{
        [createMediaQuery(BREAKPOINTS.alpha)]: {
          display: 'grid',
          gridTemplateColumns: '1fr 3fr',
          gridGap: bs(),
          alignItems: 'center',
          marginBottom: bs(3),
        },
      }}
    >
      <div
        css={{
          display: 'block',
          padding: bs(0.5),
          marginBottom: bs(),
          [createMediaQuery(BREAKPOINTS.alpha)]: {
            marginBottom: 0,
          },
        }}
      >
        <img
          css={{ display: 'block' }}
          src={logo.childImageSharp.original.src}
          alt={title}
        />
      </div>
      <div>
        <h3>{title}</h3>
        <div
          css={{ marginBottom: bs() }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div css={{ 'a + a': { marginLeft: bs(0.5) } }}>
          {url && (
            <LinkButton href={formattedUrl}>
              {BUTTON_TEXT_BY_URL_TYPE[urlType]}
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  )
}
