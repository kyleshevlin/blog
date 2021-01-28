import React from 'react'

export default function RelatedTweet() {
  return (
    <>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          <span aria-label="fire" role="img">
            🔥
          </span>{' '}
          take I haven&#39;t fully thought through incoming: Every use of
          useEffect should be in a custom hook with a damn good name.
          <br />
          <br />
          It&#39;s frequently difficult to read &amp; comprehend intention of
          the code when effects are strewn about. Better to encapsulate and
          provide context.
        </p>
        &mdash; Kyle Shevlin (@kyleshevlin){' '}
        <a href="https://twitter.com/kyleshevlin/status/1330959747214819330?ref_src=twsrc%5Etfw">
          November 23, 2020
        </a>
      </blockquote>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      />
    </>
  )
}
