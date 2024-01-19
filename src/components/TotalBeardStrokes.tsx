import React from 'react'
import { dbStore } from '../stores/firebase'
import { useStore } from '@nanostores/react'

export function TotalBeardStrokes({ slug }: { slug: string }) {
  const $dbStore = useStore(dbStore)
  const [count, setCount] = React.useState(0)
  const [hasFetchedOnce, setHasFetchedOnce] = React.useState(false)

  React.useEffect(() => {
    async function fetchData() {
      $dbStore.getValueRealtime(`posts/${slug}`, snapshot => {
        const value = snapshot.val() ?? 0

        setHasFetchedOnce(true)
        setCount(value)
      })
    }

    fetchData()
  }, [$dbStore, slug])

  if (!hasFetchedOnce) return null

  return (
    <div className="font-sans text-sm">
      {count} {count === 1 ? 'stroke' : 'strokes'} bestowed
    </div>
  )
}
