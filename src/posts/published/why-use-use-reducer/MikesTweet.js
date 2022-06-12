import React from 'react'

export default function MikesTweet() {
  return (
    <>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          Random question for my react friends...
          <br />
          <br />
          Is useReducer something folks use/like?
        </p>
        &mdash; Mike Hartington (@mhartington){' '}
        <a href="https://twitter.com/mhartington/status/1492526006443335680?ref_src=twsrc%5Etfw">
          February 12, 2022
        </a>
      </blockquote>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      ></script>
    </>
  )
}
