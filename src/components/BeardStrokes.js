import React from 'react'
import debounce from 'lodash.debounce'
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

function addClicksToDatabase({ count, lastUpdateCount, slug, database }) {
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

function BeardStrokes({ slug }) {
  const { count, handleBeardClick, maximumStrokesApplied } = useBeardStrokes(
    slug
  )

  return (
    <>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'var(--fonts-catamaran)',
        }}
      >
        <div css={{ textAlign: 'center' }}>
          <button
            css={{
              appearance: 'none',
              backgroundColor: 'transparent',
              border: 'none',
              padding: `${bs(0.25)} ${bs(0.5)} 0`,
              touchAction: 'manipulation',

              '& svg': {
                fill:
                  count === 0
                    ? 'var(--colors-offsetMore)'
                    : 'var(--colors-accent)',
                transform: 'scale(.95)',
                transition: 'fill 0.3s ease, transform .15s ease',
              },

              '&:active svg': {
                transform: 'scale(1)',
              },

              '&:disabled svg': {
                fill: 'var(--colors-accentDark)',
                transform: 'scale(1)',
              },

              '&:hover svg': {
                fill: 'var(--colors-accentDark)',
              },
            }}
            onClick={handleBeardClick}
            disabled={maximumStrokesApplied}
            type="button"
          >
            <Beard width={40} />
          </button>
          <div css={{ fontFamily: 'var(--fonts-catamaran)', lineHeight: 1 }}>
            {`+${count}`}
          </div>
        </div>
        <div css={{ fontStyle: 'italic', lineHeight: 1.2 }}>
          Liked the post? Click the beard a few times to show how much.
        </div>
      </div>
    </>
  )
}

export default BeardStrokes

function useBeardStrokes(slug) {
  const database = useDatabase()
  const [count, setCount] = React.useState(0)
  const [lastUpdateCount, setLastUpdateCount] = React.useState(0)

  const maximumStrokesApplied = count >= 50

  const handleBeardClick = React.useCallback(() => {
    if (count >= 50) return
    setCount(s => s + 1)
  }, [count])

  const storeBeardClicks = React.useMemo(
    () =>
      debounce(({ count, database, lastUpdateCount, slug }) => {
        setClicksForPostInLocalStorage(slug, count)
        addClicksToDatabase({
          count,
          database,
          lastUpdateCount,
          slug,
        })
        setLastUpdateCount(count)
      }, 500),
    []
  )

  React.useEffect(() => {
    const localCount = getClicksForPostFromLocalStorage(slug)
    setCount(localCount)
    setLastUpdateCount(localCount)
  }, [slug])

  React.useEffect(() => {
    storeBeardClicks({ count, database, lastUpdateCount, slug })
  }, [count, database, lastUpdateCount, slug])

  return { count, handleBeardClick, maximumStrokesApplied }
}

function useDatabase() {
  const database = React.useRef(null)

  React.useEffect(() => {
    const lazyApp = import('@firebase/app')
    const lazyDatabase = import('@firebase/database')

    Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
      database.current = getFirebase(firebase).database()
    })
  }, [])

  return database.current
}
