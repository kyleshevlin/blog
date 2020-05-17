import React from 'react'
import { useTheme } from 'emotion-theming'
import { BREAKPOINTS, EGGHEAD_AFFILIATE_QUERY_PARAM } from '../constants'
import { bs } from '../shevy'
import { createMediaQuery } from '../utils'
import { useCoursesContext } from './CoursesProvider'

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
            gridGap: bs(),
            gridTemplateColumns: '1fr 3fr',
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
          <a css={{ display: 'block' }} href={eggheadUrlWithParams}>
            <img
              css={{
                display: 'block',
                width: '100%',
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  opacity: 0.85,
                },
              }}
              src={publicURL}
              alt={`${title} Logo`}
            />
          </a>
        </div>
        <div
          css={{
            textAlign: 'center',
            [createMediaQuery(BREAKPOINTS.alpha)]: {
              textAlign: 'left',
            },
          }}
        >
          <h2>Watch my courses on egghead.io!</h2>
          <div
            css={theme => ({
              fontFamily: theme.fonts.catamaran,
              marginBottom: bs(0.5),
            })}
          >
            Liked the post? You might like my video lessons, too. Click the link
            below to get started.
          </div>
          <a href={eggheadUrlWithParams}>
            <h3>{title}</h3>
          </a>
        </div>
      </div>
    </div>
  )
}
