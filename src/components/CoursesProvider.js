import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const CoursesContext = React.createContext([])

export default function CoursesProvider({ children }) {
  const data = useStaticQuery(graphql`
    query AllCourses {
      allCoursesJson(sort: { fields: date, order: DESC }) {
        edges {
          node {
            logo {
              publicURL
            }
            title
            nickname
            url
          }
        }
      }
    }
  `)
  const courses = data.allCoursesJson.edges.map(edge => edge.node)

  const getRandomCourse = React.useCallback(() => {
    const index = Math.floor(Math.random() * courses.length)
    return courses[index]
  }, [courses])

  const getCourseByNickname = React.useCallback(
    nickname => courses.find(course => course.nickname === nickname),
    [courses]
  )

  const value = {
    courses,
    getCourseByNickname,
    getRandomCourse,
  }

  return (
    <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
  )
}

export const useCoursesContext = () => React.useContext(CoursesContext)
