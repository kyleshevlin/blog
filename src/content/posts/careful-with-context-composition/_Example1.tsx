import { Button } from '../../../components/Button'
import useForceUpdate from '../../../hooks/useForceUpdate'
import { Box } from './_shared'

export default function App() {
  const forceUpdate = useForceUpdate()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button onClick={forceUpdate}>Force Update</Button>
      </div>
      <Box />
    </div>
  )
}
