import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { bs } from '../shevy'
import Seo from '../components/Seo'

const About = ({ data }) => {
  const imgSrc = data.allImageSharp.edges[0].node.original.src

  return (
    <Fragment>
      <Seo title="About" keywords={['About', 'Kyle Shevlin']} />

      <h1>About</h1>
      <p>
        Hello, I am obviously Kyle Shevlin and I am a web developer. I live and
        work in Portland, Oregon.
      </p>
      <p>
        If I had to describe myself, which I <em>do</em> have to do at this
        moment, I would say that I’m a simple, Midwestern man who happens to be
        the forbidden lovechild between a Vulcan and a Viking. Intelligent and
        too logical for this <em>senseless</em> world, mixed with all the
        passion and fire that would come from a lifetime of battle, raiding and
        a beard as “magniglorious” as my own (that’s right, my beard deserved an
        invented adjective of its own).
      </p>
      <p>
        I, of course, bring this to my approach to web development. I strive for
        logical, simple designs without frills or distractions from the passion
        and fire that’s behind the product. Don’t get me wrong, I enjoy a good
        looking website as much as the next person (well, probably a little
        less, honestly), but if you’re adding polish to a pile of shit, well,
        you still have a pile of shit.
      </p>
      <p>
        To that end, I have a motto that is the driving force behind my work,
        “With all things, leave them better than you find them.” There is almost{' '}
        <strong>nothing</strong> in this world that could not use some
        improvement. Most of us could be a better person and most of us could
        use better websites.
      </p>
      <blockquote>
        With all things, leave them better than you find them.
      </blockquote>
      <p>
        Each day, I push myself on a journey of constant, incremental, almost
        annoyingly incessant improvement. The same goes for my work. If I
        realize three months, six months, a year later that there is a much
        better, more efficient, more logical way to accomplish something, I take
        the time to make the improvement. It just doesn’t make sense (at least
        to me) to leave anything in an inferior state.
      </p>
      <p>
        And I expect others to try and do the same. It’s the Vulcan in me, I
        can’t help it. Thus, my hope with this blog is to share some of the ways
        I’ve been able to improve my web development skills and help you on your
        journey of improvement. Hope it helps.
      </p>
      <p>
        Lastly, lest you think of me as a workaholic, let me tell you a bit more
        of what I do in my leisure. When I’m not coding, you can most likely
        find me playing Ultimate. It’s the most kick ass sport ever (and I’ve
        played most of them). There is nothing quite like a full-extension,
        layout dive to catch a disc that you thought you might not be able to
        catch or throwing a pass to someone <em>else</em> who makes a great,
        layout catch. Seriously, one of the best feelings ever. I recommend
        everyone try it at least once.
      </p>
      <p>
        When I’m not playing ultimate, you can probably find me playing video
        games with my wife (that’s right, my wife’s a gamer, too. I know, you’re
        jealous that I’m such a lucky man. It’s ok.) or having a good beer and
        food with some friends.
      </p>
      <div
        css={{
          maxWidth: '640px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: bs(2)
        }}
      >
        <img
          css={{ display: 'block' }}
          src={imgSrc}
          alt="Anna and Kyle at FINE's Christmas Party"
        />
        <div
          css={theme => ({
            backgroundColor: theme.colors.offset,
            fontFamily: theme.fonts.catamaran,
            fontStyle: 'italic',
            lineHeight: 1.5,
            padding: `${bs(0.5)} ${bs()}`
          })}
        >
          My wife trying to eat me with one of those hats that Sherlock Holmes
          would wear. I don't blame her. I'm definitely nom-ible.
        </div>
      </div>

      <h3>More Interested In My Resume?</h3>
      <p>
        You can find my resume on my{' '}
        <a href="https://kyleshevlin.github.io">Github Page</a> and see the work
        I do on my <a href="https://github.com/kyleshevlin">Github Profile</a>.
        You can also look at the <a href="/portfolio">Portfolio</a> page to see
        highlights of my recent work.
      </p>
    </Fragment>
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
