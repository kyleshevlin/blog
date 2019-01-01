import React from 'react'
import styled from '@emotion/styled'
import { BREAKPOINTS } from '../constants'
import { createMediaQuery } from '../utils'

const Wrap = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 80%;

  ${createMediaQuery(BREAKPOINTS.bravo)} {
    width: 70%;
  }

  ${createMediaQuery(BREAKPOINTS.charlie)} {
    width: 60%;
  }

  ${createMediaQuery(BREAKPOINTS.delta)} {
    width: 50%;
  }
`

const Container = ({ children }) => <Wrap>{children}</Wrap>

export default Container
