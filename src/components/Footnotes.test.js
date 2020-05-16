import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import {
  FootnotesProvider,
  FootnoteDisplay as Display,
  FootnoteMarker as Marker
} from './Footnotes'
import ThemeProvider from './ThemeProvider'

describe('Markers', () => {
  it('should generate their own indexes', () => {
    const { getByText } = render(
      <ThemeProvider>
        <FootnotesProvider>
          <Marker content="foo" />
          <Marker content="bar" />
          <Marker content="baz" />
        </FootnotesProvider>
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
        <FootnotesProvider>
          <Marker content="foo" />
          <Marker content="bar" />
          <Marker content="baz" />

          <Display />
        </FootnotesProvider>
      </ThemeProvider>
    )

    fireEvent.click(getByText('1'))

    expect(getByText('foo')).toBeTruthy()
  })
})
