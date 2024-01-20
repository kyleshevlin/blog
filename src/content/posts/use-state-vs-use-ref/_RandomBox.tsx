import { Button } from '../../../components/Button'
import useForceUpdate from '../../../hooks/useForceUpdate'
import { randomRGB } from '../../../utils'

export default function RandomBox() {
  const forceUpdate = useForceUpdate()

  return (
    <div
      className="flex justify-center p-4"
      style={{
        backgroundColor: randomRGB(),
      }}
    >
      <Button onClick={forceUpdate}>Force Update</Button>
    </div>
  )
}
