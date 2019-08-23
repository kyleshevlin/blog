import React, { Component } from 'react'
import { getFirebase } from '../firebase'
import Beard from './icons/Beard'
import { inflect } from '../utils'
import { COLORS, FONTS } from '../constants'
import { bs } from '../shevy'

class TotalBeardStrokes extends Component {
  state = {
    count: 0,
    hasFetchedOnce: false
  }

  componentDidMount() {
    const lazyApp = import('@firebase/app')
    const lazyDatabase = import('@firebase/database')
    const { slug } = this.props

    Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
      const database = getFirebase(firebase).database()

      database.ref(`posts/${slug}`).on('value', snapshot => {
        const value = snapshot.val()
        const update = { hasFetchedOnce: true }

        if (value) {
          update.count = value
        }

        this.setState(update)
      })
    })
  }

  render() {
    const { count, hasFetchedOnce } = this.state

    return hasFetchedOnce ? (
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          fontFamily: FONTS.catamaran,
          fontSize: '0.75em',
          marginLeft: bs(-0.25),
          marginTop: bs(-0.25),
          marginBottom: bs(),

          '& svg': {
            display: 'block',
            fill: COLORS.teal,
            marginLeft: bs(0.25),
            marginRight: bs(0.25)
          }
        }}
      >
        <Beard width={20} />
        <div>
          {count} {inflect('stroke', 'strokes', count)} bestowed
        </div>
      </div>
    ) : null
  }
}

export default TotalBeardStrokes
