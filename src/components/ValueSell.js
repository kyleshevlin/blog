import React from 'react'
import { Link } from 'gatsby'
import { EGGHEAD_AFFILIATE_QUERY_PARAM } from '../constants'
import shevy, { bs } from '../shevy'
import { mq } from '../utils'
import { useCoursesContext } from './CoursesProvider'
import LinkButton from './LinkButton'

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

export default function ValueSell({ courseNickname }) {
  const { getCourseByNickname, getRandomCourse } = useCoursesContext()

  let course

  /**
   * If the post has a courseNickname for an associated course,
   * try to get that course.
   */
  if (courseNickname) {
    course = getCourseByNickname(courseNickname)
  }

  /**
   * If for some reason the nickname didn't work, choose a course at random
   * to display
   */
  if (!course) {
    course = getRandomCourse()
  }

  const { logo, title, url } = course

  const publicURL = logo?.publicURL
  const urlType = getUrlType(url)
  const formattedUrl = formatUrl(url, urlType)

  return (
    <div
      css={{
        backgroundColor: 'var(--colors-offset)',
        padding: bs(2),
      }}
    >
      <div
        css={{
          [mq.alpha]: {
            display: 'grid',
            gridGap: bs(2),
            gridTemplateColumns: '1fr 2fr',
            alignItems: 'center',
          },
        }}
      >
        <div
          css={{
            marginBottom: bs(),
            [mq.alpha]: {
              marginBottom: 0,
            },
          }}
        >
          <div css={{ textAlign: 'center' }}>
            {publicURL && (
              <img
                css={{
                  display: 'block',
                  width: '100%',
                  marginBottom: bs(0.5),
                }}
                src={publicURL}
                alt={`${title} Logo`}
              />
            )}
            <div
              css={{
                fontSize: publicURL ? 'inherit' : shevy.h2.fontSize,
                fontFamily: 'var(--fonts-catamaran)',
              }}
            >
              {title}
            </div>
          </div>
        </div>
        <div
          css={{
            textAlign: 'center',
            [mq.alpha]: {
              textAlign: 'left',
            },
          }}
        >
          <h2>Check out my courses!</h2>
          <div
            css={{
              fontFamily: 'var(--fonts-catamaran)',
              marginBottom: bs(1),
            }}
          >
            Liked the post? You might like my courses, too. Click the button to
            view this course or go to <Link to="/courses">Courses</Link> for
            more information.
          </div>
          <div css={{ a: { marginTop: bs(0.5), marginRight: bs(0.5) } }}>
            <LinkButton href={formattedUrl}>
              {BUTTON_TEXT_BY_URL_TYPE[urlType]}
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}
