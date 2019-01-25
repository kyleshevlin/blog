import React, { Component, Fragment } from 'react'
import debounce from 'lodash.debounce'
import { darken } from 'polished'
import { FONTS, COLORS } from '../constants'
import { bs } from '../shevy'
import Beard from '../components/icons/Beard'

const LOCAL_STORAGE_KEY = 'kyleshevlin:beardStrokes'

function getClicksForPostFromLocalStorage(slug) {
  let data = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  let count = 0

  if (data) {
    data = JSON.parse(data)

    if (data[slug]) {
      count = data[slug]
    }
  }

  return count
}

function setClicksForPostInLocalStorage(slug, count) {
  let data = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  let update = { [slug]: count }

  if (data) {
    data = JSON.parse(data)
    update = { ...data, [slug]: count }
  }

  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(update))
}

class BeardStrokes extends Component {
  state = {
    count: getClicksForPostFromLocalStorage(this.props.slug)
  }

  handleBeardClick = () => {
    this.setState(
      state => ({ count: Math.min(50, state.count + 1) }),
      this.storeBeardClicks
    )
  }

  storeBeardClicks = debounce(() => {
    const { slug } = this.props
    const { count } = this.state
    setClicksForPostInLocalStorage(slug, count)
  }, 500)

  render() {
    const { count } = this.state

    return (
      <Fragment>
        <hr />
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <div css={{ marginRight: bs(), textAlign: 'center' }}>
            <button
              css={{
                appearance: 'none',
                border: 'none',
                padding: `${bs(0.25)} ${bs(0.5)}`,
                '& svg': {
                  fill: count === 0 ? COLORS.gray : COLORS.teal,
                  transform: 'scale(.95)',
                  transition: 'fill 0.3s ease, transform .15s ease'
                },
                '&:active svg': {
                  transform: 'scale(1)'
                },
                '&:disabled svg': {
                  fill: darken(0.1, COLORS.teal),
                  transform: 'scale(1)'
                },
                '&:hover svg': {
                  fill: darken(0.1, COLORS.teal)
                }
              }}
              onClick={this.handleBeardClick}
              disabled={count === 50}
              type="button"
            >
              <Beard width={60} />
            </button>
            <div css={{ fontFamily: FONTS.catamaran }}>{`+${count}`}</div>
          </div>
          <div>
            <p css={{ marginBottom: 0 }}>
              Liked the post? Why not show it?! Stroke Kyle's ego by{' '}
              <span css={{ textDecoration: 'line-through' }}>stroking</span>{' '}
              clicking his beard. You can click up to 50 times if you{' '}
              <em>really</em> liked it.
            </p>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default BeardStrokes
