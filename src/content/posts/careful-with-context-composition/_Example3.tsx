import React from 'react'
import { Button } from '../../../components/Button'
import useForceUpdate from '../../../hooks/useForceUpdate'
import { Box } from './_shared'

const MyContext = React.createContext(() => {})
const useMyContext = () => React.useContext(MyContext)

function MyProvider({ children }: { children: React.ReactNode }) {
  const forceUpdate = useForceUpdate()

  return <MyContext.Provider value={forceUpdate}>{children}</MyContext.Provider>
}

function Trigger() {
  const forceUpdate = useMyContext()

  return <Button onClick={forceUpdate}>Force Update</Button>
}

export default function App() {
  return (
    <MyProvider>
      <div className="mb-4">
        <Trigger />
      </div>
      <Box />
    </MyProvider>
  )
}
