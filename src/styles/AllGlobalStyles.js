import React from 'react'
import FontFaces from '../styles/FontFaces'
import Miscellaneous from '../styles/Miscellaneous'
import Reset from '../styles/Reset'
import Tags from '../styles/Tags'
import Tweets from '../styles/Tweets'
import Typography from '../styles/Typography'

export default function AllGlobalStyles() {
  return (
    <>
      <Reset />
      <FontFaces />
      <Tags />
      <Typography />
      <Tweets />
      <Miscellaneous />
    </>
  )
}
