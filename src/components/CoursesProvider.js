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

  return (
    <CoursesContext.Provider value={courses}>
      {children}
    </CoursesContext.Provider>
  )
}

export const useCoursesContext = () => React.useContext(CoursesContext)
