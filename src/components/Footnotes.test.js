import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import {
  FootnotesContainer as Container,
  FootnoteDisplay as Display,
  FootnoteMarker as Marker
} from './Footnotes'
import ThemeProvider from './ThemeProvider'

describe('Markers', () => {
  it('should generate their own indexes', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Container>
          <Marker content="foo" />
          <Marker content="bar" />
          <Marker content="baz" />
        </Container>
      </ThemeProvider>
    )

    expect(getByText('1')).toBeTruthy()
    expect(getByText('2')).toBeTruthy()
    expect(getByText('3')).toBeTruthy()
  })
})

describe('Display', () => {
  it('should show the right content', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Container>
          <Marker content="foo" />
          <Marker content="bar" />
          <Marker content="baz" />

          <Display />
        </Container>
      </ThemeProvider>
    )

    fireEvent.click(getByText('1'))

    expect(getByText('foo')).toBeTruthy()
  })
})
