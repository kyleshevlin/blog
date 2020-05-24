import React from 'react'
import { useTheme } from 'emotion-theming'
import { BREAKPOINTS, EGGHEAD_AFFILIATE_QUERY_PARAM } from '../constants'
import { bs } from '../shevy'
import { createMediaQuery } from '../utils'
import { useCoursesContext } from './CoursesProvider'
import LinkButton from './LinkButton'

const randomIndex = length => Math.floor(Math.random() * length)

const chooseCourse = (courses, nickname) => {
  if (!courses.length) return null

  const randomCourse = courses[randomIndex(courses.length)]

  if (!nickname) return randomCourse

  const course = courses.find(course => course.nickname === nickname)

  if (!course) return randomCourse

  return course
}

export default function ValueSell({ courseNickname }) {
  const theme = useTheme()
  const courses = useCoursesContext()
  const course = chooseCourse(courses, courseNickname)

  if (!course) return null

  const {
    logo: { publicURL },
    title,
    eggheadUrl,
    podiaUrl,
  } = course
  const eggheadUrlWithParams = eggheadUrl + EGGHEAD_AFFILIATE_QUERY_PARAM

  return (
    <div
      css={{
        backgroundColor: theme.colors.offset,
        padding: bs(2),
      }}
    >
      <div
        css={{
          [createMediaQuery(BREAKPOINTS.alpha)]: {
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
            [createMediaQuery(BREAKPOINTS.alpha)]: {
              marginBottom: 0,
            },
          }}
        >
          <div css={{ textAlign: 'center' }}>
            <img
              css={{
                display: 'block',
                width: '100%',
                marginBottom: bs(0.5),
              }}
              src={publicURL}
              alt={`${title} Logo`}
            />
            <div css={theme => ({ fontFamily: theme.fonts.catamaran })}>
              {title}
            </div>
          </div>
        </div>
        <div
          css={{
            textAlign: 'center',
            [createMediaQuery(BREAKPOINTS.alpha)]: {
              textAlign: 'left',
            },
          }}
        >
          <h2>Check out my courses!</h2>
          <div
            css={theme => ({
              fontFamily: theme.fonts.catamaran,
              marginBottom: bs(1),
            })}
          >
            Liked the post? You might like my video courses, too. Watch them on
            Podia or egghead.io.
          </div>
          <div css={{ a: { marginTop: bs(0.5), marginRight: bs(0.5) } }}>
            <LinkButton href={podiaUrl}>View on Podia</LinkButton>
            <LinkButton href={eggheadUrlWithParams}>
              View on egghead.io
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}
