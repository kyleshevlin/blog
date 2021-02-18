import React from 'react'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'

export default function Snippets() {
  const joshLink = (
    <a href="https://www.joshwcomeau.com/snippets/">Josh W. Comeau's blog</a>
  )

  return (
    <>
      <Seo title="Snippets" keywords={['Snippets', 'Kyle Shevlin']} />
      <h1>Snippets</h1>

      <p>
        Inspired by {joshLink}, this is a collection of my code snippets that
        you can look at for inspiration or copy/paste at will.
      </p>

      <div>Snippets will go here</div>

      <AddedValue />
    </>
  )
}
