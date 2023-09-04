import React from 'react'
import { graphql, Link } from 'gatsby'
import { Margin, useSpacing } from '@kyleshevlin/layout'
import { getButtonStyles } from '../components/Button'
import ExcerptList from '../components/ExcerptList'
import Seo from '../components/Seo'
import shevy from '../shevy'
import { mq, getNodes } from '../utils'
import Content from '../components/Content'
import LinkButton from '../components/LinkButton'
import Layout from '../components/Layout'

export default function Home({ data }) {
  const bs = useSpacing()

  const recentPosts = getNodes(data.recent)

  return (
    <Layout>
      <Seo
        title="Home"
        keywords={['Kyle Shevlin', 'React', 'JavaScript', 'TypeScript']}
      />

      <Content>
        <Welcome />
        <hr />
        <SelectedTags />
        <hr />
        <h3>Recent Posts</h3>
        <ExcerptList posts={recentPosts} />

        <div css={{ backgroundColor: 'var(--colors-offset)', padding: bs(1) }}>
          <h3>Looking for more posts?</h3>
          <Margin bottom={1}>
            If you're looking for more posts, visit the{' '}
            <Link to="/all-posts">All Posts</Link> page.
          </Margin>
          <LinkButton href="/all-posts" variant="bigWide">
            All Posts
          </LinkButton>
        </div>
      </Content>
    </Layout>
  )
}

export const query = graphql`
  query HomeQuery($skip: Int!, $limit: Int!) {
    recent: allMdx(
      filter: { fileAbsolutePath: { regex: "/posts/published/" } }
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            excerpt
            slug
            subtitle
            tags
            title
          }
          excerpt(pruneLength: 300)
        }
      }
    }
  }
`

function Welcome() {
  const bs = useSpacing()

  return (
    <section css={{ marginBottom: bs(2) }}>
      <h2>Welcome!</h2>
      <p>
        Hi, I'm Kyle Shevlin, a software engineer and online instructor. This is
        where I share all the content I create. I mostly write articles and
        create courses, focusing on breaking concepts down to their
        fundamentals.
      </p>
      <p>
        Peruse my blog posts, check out one of my courses (or all of them), and
        sign up for my newsletter if you like what you read.
      </p>
      <p>
        If you need to reach out to me,{' '}
        <a href="mailto:kyle@kyleshevlin.com">email</a> is the best way to do
        so.
      </p>
      <p>Enjoy your time here and thank you.</p>
    </section>
  )
}

const TAGS = [
  { to: 'react', label: 'React' },
  { to: 'state-machines', label: 'State Machines' },
  { to: 'functional-programming', label: 'Functional Programming' },
  { to: 'software-engineering', label: 'Software Engineering' },
]

function SelectedTags() {
  const bs = useSpacing()

  return (
    <section>
      <h3>Unsure Where to Start?</h3>
      <p>Try a post in one of these tagged collections.</p>
      <div
        css={{
          display: 'grid',
          gridGap: bs(1),

          [mq.alpha]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
        }}
      >
        {TAGS.map(({ label, to }) => (
          <CollectionItem key={label} label={label} to={to} />
        ))}
      </div>
    </section>
  )
}

function CollectionItem({ label, to }) {
  const bs = useSpacing()
  const styles = React.useMemo(
    () => ({
      ...getButtonStyles(bs),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'var(--fonts-secondary)',
      fontSize: shevy.h4.fontSize,
      padding: bs(1),
    }),
    [bs]
  )

  return (
    <Link css={styles} to={`/tags/${to}`}>
      <span>{label}</span>
    </Link>
  )
}
