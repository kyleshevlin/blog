import React, { Component, Fragment } from 'react'
import debounce from 'lodash.debounce'
import { darken, transparentize } from 'polished'
import Beard from '../components/icons/Beard'
import { getFirebase } from '../firebase'
import { bs } from '../shevy'

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

function addClicksToDatabase(database, slug, count, lastUpdateCount) {
  if (database) {
    database
      .ref(`posts/${slug}`)
      .once('value')
      .then(snapshot => {
        const value = snapshot.val()
        const currentTotal = value ? value : 0

        database
          .ref('posts')
          .child(slug)
          // If we don't track and subtract the lastUpdateCount, then if a user
          // leaves and comes back to a post, we'll be adding whatever clicks
          // they had stored in localStorage AGAIN to the database if they choose
          // to like the post some more.
          .set(currentTotal + count - lastUpdateCount)
      })
  }
}

class BeardStrokes extends Component {
  state = {
    count: 0,
    database: null,
    lastUpdateCount: 0
  }

  handleBeardClick = () => {
    this.setState(state =>
      state.count >= 50 ? null : { count: Math.min(50, state.count + 1) }
    )
  }

  storeBeardClicks = debounce(() => {
    const { slug } = this.props
    const { count, database, lastUpdateCount } = this.state

    setClicksForPostInLocalStorage(slug, count)
    addClicksToDatabase(database, slug, count, lastUpdateCount)
    this.setState({ lastUpdateCount: count })
  }, 500)

  componentDidMount() {
    const lazyApp = import('@firebase/app')
    const lazyDatabase = import('@firebase/database')
    const { slug } = this.props

    Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
      const database = getFirebase(firebase).database()
      const localCount = getClicksForPostFromLocalStorage(slug)

      this.setState({
        count: localCount,
        database,
        lastUpdateCount: localCount
      })
    })
  }

  componentDidUpdate() {
    this.storeBeardClicks()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.count !== this.state.count
  }

  render() {
    const { count } = this.state

    return (
      <Fragment>
        <hr />
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <div css={{ marginRight: bs(), textAlign: 'center' }}>
            <button
              css={theme => ({
                appearance: 'none',
                backgroundColor: 'transparent',
                border: 'none',
                padding: `${bs(0.25)} ${bs(0.5)}`,
                '& svg': {
                  fill:
                    count === 0 ? theme.colors.offsetMore : theme.colors.accent,
                  transform: 'scale(.95)',
                  transition: 'fill 0.3s ease, transform .15s ease'
                },
                '&:active svg': {
                  transform: 'scale(1)'
                },
                '&:disabled svg': {
                  fill: darken(0.1, theme.colors.accent),
                  transform: 'scale(1)'
                },
                '&:hover svg': {
                  fill: darken(0.1, theme.colors.accent)
                }
              })}
              onClick={this.handleBeardClick}
              disabled={count === 50}
              type="button"
            >
              <Beard width={60} />
            </button>
            <div
              css={theme => ({ fontFamily: theme.fonts.catamaran })}
            >{`+${count}`}</div>
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
        <hr />
      </Fragment>
    )
  }
}

export default BeardStrokes
