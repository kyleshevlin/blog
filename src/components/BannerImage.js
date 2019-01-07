import React from 'react'
import styled from '@emotion/styled'
import { bs } from '../shevy'

const Wrap = styled.div`
  margin-bottom: ${bs(2)};
`

const Image = styled.img`
  display: block;
`

const BannerImage = ({ alt, src }) => {
  return (
    <Wrap>
      <Image {...{ alt, src }} />
    </Wrap>
  )
}

export default BannerImage
