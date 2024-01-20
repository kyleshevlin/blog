import React from 'react'
import debounce from 'lodash.debounce'
import { dbStore } from '../stores/firebase'
import { Button } from './Button'

const LOCAL_STORAGE_KEY = 'kyleshevlin:beardStrokes'

function getClicksForPostFromLocalStorage(slug: string) {
  const data = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  let count = 0

  if (data) {
    const parsed = JSON.parse(data)

    if (parsed[slug]) {
      count = parsed[slug]
    }
  }

  return count
}

function setClicksForPostInLocalStorage(slug: string, count: number) {
  const data = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  let update = { [slug]: count }

  if (data) {
    const parsed = JSON.parse(data)
    update = { ...parsed, [slug]: count }
  }

  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(update))
}

function addClicksToDatabase({
  count,
  lastUpdateCount,
  slug,
}: {
  count: number
  lastUpdateCount: number
  slug: string
}) {
  const { getValueOnce, setValue } = dbStore.get()

  if (getValueOnce && setValue) {
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

interface Props {
  children: React.ReactNode
  slug: string
}

export function BeardStrokes({ children, slug }: Props) {
  const { count, handleBeardClick, maximumStrokesApplied } =
    useBeardStrokes(slug)

  return (
    <Button disabled={maximumStrokesApplied} onClick={handleBeardClick}>
      <div className="flex items-center justify-center gap-2">
        {children}
        <span>
          +<span id="stroke-count">{count}</span>
        </span>
      </div>
    </Button>
  )
}

const LIMIT = 50

function useBeardStrokes(slug: string) {
  const [count, setCount] = React.useState(0)
  const [lastUpdateCount, setLastUpdateCount] = React.useState(0)

  const maximumStrokesApplied = count >= LIMIT

  const handleBeardClick = React.useCallback(() => {
    setCount(_count => (_count >= LIMIT ? _count : _count + 1))
  }, [])

  const storeBeardClicks = React.useMemo(
    () =>
      debounce(
        ({
          count,
          lastUpdateCount,
          slug,
        }: {
          count: number
          lastUpdateCount: number
          slug: string
        }) => {
          setClicksForPostInLocalStorage(slug, count)
          addClicksToDatabase({ count, lastUpdateCount, slug })
          setLastUpdateCount(count)
        },
        500,
      ),
    [],
  )

  React.useEffect(() => {
    if (!slug) return

    const localCount = getClicksForPostFromLocalStorage(slug)
    setCount(localCount)
    setLastUpdateCount(localCount)
  }, [slug])

  React.useEffect(() => {
    storeBeardClicks({ count, lastUpdateCount, slug })
  }, [count, lastUpdateCount, slug, storeBeardClicks])

  return { count, handleBeardClick, maximumStrokesApplied }
}
