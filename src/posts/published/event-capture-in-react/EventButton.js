import React from 'react'
import { Flex, Margin } from '@kyleshevlin/layout'
import Button from '../../../components/Button'

export default function EventButton() {
  const [enable, setEnable] = React.useState(true)

  React.useEffect(() => {
    if (!enable) return

    function logNodeName() {
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
    <Flex direction="column" gap={1}>
      <p css={{ marginBottom: 0 }}>
        Check out the console to see the logs after clicking.
      </p>

      <Flex align="center" gap={0.5}>
        <Button>Click me</Button>

        <div>
          <label>
            <Margin inline right={0.25}>
              Event listeners enabled*
            </Margin>
            <input
              type="checkbox"
              checked={enable}
              onChange={e => setEnable(e.target.checked)}
            />
          </label>
        </div>
      </Flex>

      <p
        css={{
          fontFamily: 'var(--fonts-catamaran)',
          width: '75%',
          marginBottom: 0,
        }}
      >
        *Disabling will prevent "noise" in the console which might be useful in
        the rest of the post.
      </p>
    </Flex>
  )
}
