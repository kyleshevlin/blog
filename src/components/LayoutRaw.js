import { css, Global } from '@emotion/core'
import { Flex } from '@kyleshevlin/layout'
import { Link } from 'gatsby'
import React from 'react'
import { bs } from '../shevy'
import { mq } from '../utils'

export function LayoutRaw({ children }) {
  return (
    <>
      <Global
        styles={css`
          html {
            font-family: monospace;
            font-size: 120%;
            line-height: 1.5;
            padding: ${bs(1)};
            margin: 0 auto;
            max-width: 80ch;
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
