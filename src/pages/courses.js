import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Seo from '../components/Seo'
import { EGGHEAD_AFFILIATE_QUERY_PARAM } from '../constants'
import { bs } from '../shevy'
import { mq, getNodes } from '../utils'
import Container from '../components/Container'
import LinkButton from '../components/LinkButton'
import Main from '../components/Main'
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
    <Container>
      <Main>
        <Seo title="Courses" keywords={['Courses', 'Kyle Shevlin']} />
        <h1>Courses</h1>

        <div css={{ marginTop: bs(2), marginBottom: bs(4) }}>
          {courses.map(course => (
            <CourseItem key={course.title} {...course} />
          ))}
        </div>

        <NewsletterCTA />
      </Main>
    </Container>
  )
}

const BUTTON_TEXT_BY_URL_TYPE = {
  default: 'View the course',
  egghead: 'View on egghead.io',
}

function getUrlType(url) {
  switch (true) {
    case /egghead/g.test(url):
      return 'egghead'

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
        marginBottom: bs(4),

        [mq.alpha]: {
          display: 'grid',
          gridTemplateColumns: '1fr 3fr',
          gridGap: bs(),
          alignItems: 'center',
        },
      }}
    >
      <div
        css={{
          display: 'block',
          padding: bs(0.5),
          marginBottom: bs(),

          [mq.alpha]: {
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
        <p
          css={{ marginBottom: bs() }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {url && (
          <div>
            <LinkButton href={formattedUrl}>
              {BUTTON_TEXT_BY_URL_TYPE[urlType]}
            </LinkButton>
          </div>
        )}
      </div>
    </div>
  )
}
