import React from 'react'
import { Button } from '../../../components/Button'

export default function EventButton() {
  const [enable, setEnable] = React.useState(true)

  React.useEffect(() => {
    if (!enable) return

    function logNodeName() {
      // @ts-expect-error this is any
      console.log(this.nodeName)
    }

    const allElements = document.querySelectorAll('*')

    for (const el of allElements) {
      el.addEventListener('click', logNodeName, true)
      el.addEventListener('click', logNodeName)
    }

    return () => {
      for (const el of allElements) {
        el.removeEventListener('click', logNodeName, true)
        el.removeEventListener('click', logNodeName)
      }
    }
  }, [enable])

  return (
    <div className="flex flex-col gap-4 font-sans">
      <div className="flex items-center gap-4">
        <Button>Click me</Button>

        <p>Check out the console to see the logs after clicking.</p>
      </div>

      <hr className="border-t-2 border-t-gray-300 dark:border-t-gray-700" />

      <div>
        <label className="flex gap-2">
          <span className="font-bold">Event listeners enabled</span>

          <input
            type="checkbox"
            checked={enable}
            onChange={e => setEnable(e.target.checked)}
          />
        </label>

        <p className="max-w-[50ch]">
          Disabling the event listeners will prevent &ldquo;noise&rdquo; in the
          console which might be useful in the rest of the post.
        </p>
      </div>
    </div>
  )
}
