import React from 'react'
import Button from '../../../components/Button'

export default function EventButton() {
  React.useEffect(() => {
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
  }, [])

  return (
    <div css={{ textAlign: 'center' }}>
      <p>Check out the console to see the logs after clicking.</p>
      <Button>Click me</Button>
    </div>
  )
}
