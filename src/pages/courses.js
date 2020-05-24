import React, { Fragment } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Seo from '../components/Seo'
import { BREAKPOINTS, EGGHEAD_AFFILIATE_QUERY_PARAM } from '../constants'
import { bs } from '../shevy'
import { createMediaQuery } from '../utils'
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
          eggheadUrl
          podiaUrl
        }
      }
    }
  }
`

function CourseItem({ description, eggheadUrl, podiaUrl, logo, title }) {
  const eggheadUrlWithParams = eggheadUrl + EGGHEAD_AFFILIATE_QUERY_PARAM

  return (
    <div
      css={{
        [createMediaQuery(BREAKPOINTS.alpha)]: {
          display: 'grid',
          gridTemplateColumns: '1fr 3fr',
          alignItems: 'center',
          marginBottom: bs(2),
        },
      }}
    >
      <a
        css={{
          display: 'block',
          padding: bs(0.5),
          marginBottom: bs(),
          [createMediaQuery(BREAKPOINTS.alpha)]: {
            marginBottom: 0,
          },
        }}
        href={eggheadUrlWithParams}
      >
        <img
          css={{
            display: 'block',
            transition: 'opacity .3s ease',
            '&:hover': {
              opacity: 0.85,
            },
          }}
          src={logo.childImageSharp.original.src}
          alt={title}
        />
      </a>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div css={{ 'a + a': { marginLeft: bs(0.5) } }}>
          {podiaUrl && <LinkButton href={podiaUrl}>View on Podia</LinkButton>}
          {eggheadUrl && (
            <LinkButton href={eggheadUrlWithParams}>
              View on egghead.io
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  )
}

const Courses = () => (
  <Fragment>
    <Seo title="Courses" keywords={['Courses', 'Kyle Shevlin']} />
    <h1>Courses</h1>
    <StaticQuery
      query={query}
      render={data => {
        const courses = data.allCoursesJson.edges.map(edge => edge.node)

        return (
          <Fragment>
            {courses.map(course => (
              <CourseItem key={course.title} {...course} />
            ))}
          </Fragment>
        )
      }}
    />

    <NewsletterCTA />
  </Fragment>
)

export default Courses
