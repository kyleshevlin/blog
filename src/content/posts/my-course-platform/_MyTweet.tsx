export function MyTweet() {
  return (
    <>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          I&#39;m starting a new project today. I&#39;m going to build a
          mini-course on Array.reduce()!
          <br />
          <br />
          I&#39;ve seen a lot of confusion about this method, and I&#39;d like
          to help people out.
          <br />
          <br />
          For added difficulty, I&#39;m going to try and get it done in just a
          week. 😅
        </p>
        &mdash; Kyle Shevlin (@kyleshevlin){' '}
        <a href="https://twitter.com/kyleshevlin/status/1404458354810920965?ref_src=twsrc%5Etfw">
          June 14, 2021
        </a>
      </blockquote>

      <script async src="https://platform.twitter.com/widgets.js"></script>
    </>
  )
}
