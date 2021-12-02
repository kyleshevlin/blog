import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Seo from '../components/Seo'
import { EGGHEAD_AFFILIATE_QUERY_PARAM } from '../constants'
import { bs } from '../shevy'
import { mq, getNodes } from '../utils'
import LinkButton from '../components/LinkButton'
import Spacer from '../components/Spacer'
import Content from '../components/Content'

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

      <Content valueSell={false}>
        <h1>Courses</h1>

        <p>
          Here you will find all of the courses I have created with links to
          where you can get them. If you ever have a question about one of my
          courses, feel free to send me a message on{' '}
          <a href="https://twitter.com/kyleshevlin">Twitter</a> about it and
          I'll do my best to help you out.
        </p>

        <Spacer top={2} bottom={4}>
          {courses.map(course => (
            <CourseItem key={course.title} {...course} />
          ))}
        </Spacer>
      </Content>
    </>
  )
}

/**
 * This function implements a Strategy pattern for handling different
 * types of courses.
 */
function getCourseTypeValues(url) {
  switch (true) {
    case /egghead/.test(url):
      return {
        buttonText: 'View on egghead.io',
        url: url + EGGHEAD_AFFILIATE_QUERY_PARAM,
      }

    default:
      return {
        buttonText: 'View the course',
        url,
      }
  }
}

function CourseItem({ description, logo, title, url }) {
  const course = getCourseTypeValues(url)
  const imgSrc = logo?.childImageSharp?.original?.src ?? ''

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
        {imgSrc && <img css={{ display: 'block' }} src={imgSrc} alt={title} />}
      </div>
      <div>
        <h3>{title}</h3>
        <p
          css={{ marginBottom: bs() }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {url && (
          <div>
            <LinkButton href={course.url}>{course.buttonText}</LinkButton>
          </div>
        )}
      </div>
    </div>
  )
}
