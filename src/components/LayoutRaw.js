import { css, Global } from '@emotion/core'
import { Flex, useSpacing, SpacingProvider } from '@kyleshevlin/layout'
import { Link } from 'gatsby'
import React from 'react'
import { mq } from '../utils'
import createShevy from 'shevyjs'

const rawShevy = createShevy({
  baseFontSize: '1rem',
  baseLineHeight: 1.6,
})

const spacing = x => {
  return typeof x === 'number' ? rawShevy.baseSpacing(x) : x
}

export function LayoutRaw({ children }) {
  return (
    <SpacingProvider spacing={spacing}>
      <Inner>{children}</Inner>
    </SpacingProvider>
  )
}

function Inner({ children }) {
  const bs = useSpacing()

  return (
    <>
      <Global
        styles={css`
          html {
            font-family: monospace;
            font-size: 120%;
            line-height: ${rawShevy.lineHeightSpacing()};
            padding: ${bs(1)};
            margin: 0 auto;
            max-width: 80ch;
          }

          p {
            margin-block: ${bs(1)};
          }

          ${[mq.bravo]} {
            font-size: 140%;
            padding: ${bs(2)};
          }

          ${[mq.delta]} {
            font-size: 160%;
          }
        `}
      />

      <Flex direction="column" gap={2}>
        <header>
          <Flex justify="flex-end">
            <nav>
              <Flex gap={1}>
                <Link to="/">home</Link>
                <Link to="/raw">/raw</Link>
              </Flex>
            </nav>
          </Flex>
        </header>

        <main>{children}</main>
      </Flex>
    </>
  )
}
