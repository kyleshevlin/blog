import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { COLORS, FONTS } from '../constants'
import { bs } from '../shevy'

function PostOpenSourceContribution() {
  const data = useStaticQuery(graphql`
    query ContributorsInTheLast100PullRequests {
      github {
        repository(name: "blog", owner: "kyleshevlin") {
          pullRequests(states: MERGED, last: 100) {
            nodes {
              author {
                avatarUrl(size: 35)
                login
                ... on GitHub_User {
                  url
                }
              }
            }
          }
        }
      }
    }
  `)

  const contributorsHash = data.github.repository.pullRequests.nodes.reduce(
    (acc, cur) => {
      const {
        author: { avatarUrl, login, url }
      } = cur

      if (login === 'kyleshevlin') return acc
      if (acc[login]) return acc

      acc[login] = {
        avatarUrl,
        login,
        url
      }

      return acc
    },
    {}
  )
  const contributors = Object.values(contributorsHash)

  return (
    <div
      css={{
        backgroundColor: COLORS.lightGray,
        fontFamily: FONTS.catamaran,
        fontStyle: 'italic',
        padding: bs(),
        marginBottom: bs(2),
        textAlign: 'center'
      }}
    >
      <div>
        Spot a typo? Join the contributors below and submit a PR with the fix!
        This entire blog is open sourced at{' '}
        <a href="https://github.com/kyleshevlin/blog">
          https://github.com/kyleshevlin/blog
        </a>
      </div>

      {contributors.length ? (
        <div
          css={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            fontSize: '.75rem',
            fontStyle: 'normal',
            marginTop: bs(),
            marginLeft: bs(),
            marginRight: bs()
          }}
        >
          {contributors.map(contributor => {
            const { avatarUrl, login, url } = contributor

            return (
              <a
                css={{ display: 'block', padding: bs(0.25) }}
                key={login}
                href={url}
                title={`@${login}`}
              >
                <img alt={login} src={avatarUrl} />
              </a>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default PostOpenSourceContribution
