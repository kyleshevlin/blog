import React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/Seo'
import Content from '../components/Content'
import Layout from '../components/Layout'
import { FootnoteMarker as Marker } from '../components/Footnotes'
import { useSpacing } from '@kyleshevlin/layout'

const About = ({ data }) => {
  const bs = useSpacing()

  const imgSrc = data.allImageSharp.edges[0].node.original.src

  return (
    <Layout>
      <Seo title="About" keywords={['About', 'Kyle Shevlin']} />

      <Content>
        <h1>About</h1>
        <p>
          Hello, my name is Kyle Shevlin{' '}
          <Marker content="In case you hadn't figured that out yet" /> and I am
          a software developer. I live and work in wonderful Portland, Oregon.
        </p>
        <p>
          If I had to describe myself, which I <em>do</em> have to do in order
          to accomplish the purposes of an About page, I would say that I&apos;m
          a simple, Midwestern man who happens to be the forbidden lovechild
          between a Vulcan and a Viking. Make of that what you will.{' '}
          <Marker content="Really, it's just a funny way to describe having AuDHD" />
        </p>
        <p>
          I have a motto that is the driving force behind my work, “With all
          things, leave them better than you find them.” I see something that
          could be better, I try to find a way to make it better.{' '}
          <Marker content="You might even consider it a compulsion" />
        </p>
        <blockquote>
          With all things, leave them better than you find them.
        </blockquote>
        <p>
          I push myself pretty hard to do things well and take pride in the
          quality of my craft. And I expect others to try and do the same.{' '}
          <Marker content="Though I'm trying to grow and be more ok with the fact that others don't share the same goal" />{' '}
          It&apos;s the Vulcan in me, I almost can&apos;t help it.
        </p>
        <p>
          My hope with this blog is to help others improved the quality of their
          craftshare some of the ways I&apos;ve been able to do so over the
          years. I sincerely hope it helps.
        </p>
        <p>
          Lastly, lest you think of me as only a software developer, let me tell
          you a bit more of what I do in my leisure. When I&apos;m not working,
          I'm probably working on my golf game. I play in tournaments all around
          the Pacific Northwest and occasionally even win one once in a while. I
          have a nascent <a href="https://kyleshevlingolf.com">golf blog</a> I'm
          just getting started to share some of my insights into the game with
          others.
        </p>
        <p>
          When I&apos;m not playing golf, you can probably find me playing video
          games with my wife{' '}
          <Marker content="That's right, she games, too. I'm pretty lucky like that." />{' '}
          or having a good beer and food with some friends.
        </p>
        <div
          css={{
            maxWidth: '640px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: bs(2),
          }}
        >
          <img
            css={{ display: 'block' }}
            src={imgSrc}
            alt="Anna and Kyle at FINE's Christmas Party"
          />
          <div
            css={{
              backgroundColor: 'var(--colors-offset)',
              fontFamily: 'var(--fonts-secondary)',
              fontStyle: 'italic',
              lineHeight: 1.5,
              padding: `${bs(0.5)} ${bs(1)}`,
            }}
          >
            My wife trying to take a bite out of me with one of those hats that
            Sherlock Holmes would wear.
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default About

export const query = graphql`
  query AnnaKyleImageQuery {
    allImageSharp(filter: { original: { src: { regex: "/Anna-and-Kyle/" } } }) {
      edges {
        node {
          id
          original {
            src
          }
        }
      }
    }
  }
`
