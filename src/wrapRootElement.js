import React from 'react'
import { Flex, Margin } from '@kyleshevlin/layout'
import EggheadEmbed from './components/EggheadEmbed'
import CoursesProvider from './components/CoursesProvider'
import Gif from './components/Gif'
import OffsetWrap from './components/OffsetWrap'
import { FootnotesProvider, FootnoteMarker } from './components/Footnotes'
import YoutubeEmbed from './components/YoutubeEmbed'
import { ThemeProvider } from './components/ThemeProvider'
import { MDXProvider } from '@mdx-js/react'
import { makeHeadingId } from './utils'
import { SpacingProvider } from '@kyleshevlin/layout'
import { bs } from './shevy'

const makeHeading =
  element =>
  // eslint-disable-next-line react/display-name
  ({ children, ...props }) =>
    React.createElement(
      element,
      { id: makeHeadingId(children), ...props },
      children
    )

const H2 = makeHeading('h2')
const H3 = makeHeading('h3')
const H4 = makeHeading('h4')
const H5 = makeHeading('h5')
const H6 = makeHeading('h6')

const spacing = x => {
  return typeof x === 'number' ? bs(x) : x
}

const COMPONENTS = {
  EggheadEmbed,
  Flex,
  Gif,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  Marker: FootnoteMarker,
  OffsetWrap,
  Margin,
  YoutubeEmbed,
}

export function wrapRootElement({ element }) {
  return (
    <ThemeProvider>
      <SpacingProvider spacing={spacing}>
        <CoursesProvider>
          <FootnotesProvider>
            <MDXProvider components={COMPONENTS}>{element}</MDXProvider>
          </FootnotesProvider>
        </CoursesProvider>
      </SpacingProvider>
    </ThemeProvider>
  )
}
