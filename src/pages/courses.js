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
          eggheadUrl
          podiaUrl
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

function CourseItem({ description, eggheadUrl, podiaUrl, logo, title }) {
  const eggheadUrlWithParams = eggheadUrl + EGGHEAD_AFFILIATE_QUERY_PARAM

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
