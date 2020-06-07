import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import {
  FootnotesProvider,
  FootnoteDisplay as Display,
  FootnoteMarker as Marker,
} from './Footnotes'

describe('Markers', () => {
  it('should generate their own indexes', () => {
    const { getByText } = render(
      <FootnotesProvider>
        <Marker content="foo" />
        <Marker content="bar" />
        <Marker content="baz" />
      </FootnotesProvider>
    )

    expect(getByText('1')).toBeTruthy()
    expect(getByText('2')).toBeTruthy()
    expect(getByText('3')).toBeTruthy()
  })
})

describe('Display', () => {
  it('should show the right content', () => {
    const { getByText } = render(
      <FootnotesProvider>
        <Marker content="foo" />
        <Marker content="bar" />
        <Marker content="baz" />

        <Display />
      </FootnotesProvider>
    )

    fireEvent.click(getByText('1'))

    expect(getByText('foo')).toBeTruthy()
  })
})
