import React from 'react'
import debounce from 'lodash.debounce'
import { buttonStyles } from '../components/Button'
import Spacer from '../components/Spacer'
import Beard from '../components/icons/Beard'
import { getDb, getValueOnce, setValue } from '../firebase'

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
    const postRef = `posts/${slug}`

    getValueOnce(postRef, snapshot => {
      const value = snapshot.val()
      const currentTotal = value ? value : 0
      // If we don't track and subtract the lastUpdateCount, then if a user
      // leaves and comes back to a post, we'll be adding whatever clicks
      // they had stored in localStorage AGAIN to the database if they choose
      // to like the post some more.
      const nextAmount = currentTotal + count - lastUpdateCount

      setValue(postRef, nextAmount)
    })
  }
}

function BeardStrokes({ slug }) {
  const { count, handleBeardClick, maximumStrokesApplied } =
    useBeardStrokes(slug)

  return (
    <div css={{ width: '100%', textAlign: 'center' }}>
      <Spacer bottom={0.25}>
        <div
          css={{
            fontFamily: 'var(--fonts-catamaran)',
          }}
        >
          Liked the post? Click the beard up to 50 times to show&nbsp;it
        </div>
      </Spacer>
      <button
        css={{
          ...buttonStyles,
          appearance: 'none',
          backgroundColor: 'var(--components-beard-strokes-button-bg)',
          touchAction: 'manipulation',
          width: '100%',
          height: 56,

          '&:hover': {
            backgroundColor: 'var(--components-beard-strokes-button-bg-hover)',
          },

          '& svg': {
            fill:
              count === 0
                ? 'var(--components-beard-strokes-fill-default)'
                : 'var(--components-beard-strokes-fill-nonzero)',
            transform: 'scale(.95)',
            transition: 'fill 0.3s ease, transform .15s ease',
          },

          '&:active svg': {
            transform: 'scale(1)',
          },

          '&:hover svg': {
            fill: 'var(--components-beard-strokes-fill-hover)',
          },

          '&:disabled svg': {
            fill: 'var(--components-beard-strokes-fill-disabled)',
            transform: 'scale(1)',
          },
        }}
        onClick={handleBeardClick}
        disabled={maximumStrokesApplied}
        type="button"
      >
        <div
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spacer right={0.25}>
            <Beard width={40} />
          </Spacer>
          <Spacer right={0.5}>+{count}</Spacer>
        </div>
      </button>
    </div>
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
  }, [count, database, lastUpdateCount, slug, storeBeardClicks])

  return { count, handleBeardClick, maximumStrokesApplied }
}

function useDatabase() {
  const database = React.useRef(null)

  React.useEffect(() => {
    async function assignDatabase() {
      database.current = await getDb()
    }

    assignDatabase()
  }, [])

  return database.current
}
