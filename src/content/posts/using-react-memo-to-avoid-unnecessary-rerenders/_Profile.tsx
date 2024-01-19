import React from 'react'
import { Button } from '../../../components/Button'

export function Profile({ name, location }) {
  return (
    <div className="rounded bg-white p-4 dark:bg-gray-900">
      <div className="text-lg font-bold">{name}</div>
      <div className="font-sans">{location}</div>
    </div>
  )
}

export const MemoizedProfile = React.memo(Profile)

const random255 = () => Math.floor(Math.random() * 255)
const randomRGBA = () => {
  const r = random255()
  const g = random255()
  const b = random255()

  return `rgba(${r}, ${g}, ${b}, 0.3)`
}

function RandomProfile({ name, location }) {
  return (
    <div
      className="rounded p-4"
      style={{
        backgroundColor: randomRGBA(),
      }}
    >
      <div className="text-lg font-bold">{name}</div>
      <div className="font-sans">{location}</div>
    </div>
  )
}

const MemoizedRandomProfile = React.memo(RandomProfile)

export function Parent() {
  const [, setState] = React.useState(false)
  const forceUpdate = () => setState(x => !x)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <Button onClick={forceUpdate}>Force Update</Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <RandomProfile name="Kyle Shevlin" location="Portland, OR" />
        <MemoizedRandomProfile name="Kyle Shevlin" location="Portland, OR" />
      </div>
    </div>
  )
}

function ObjectProfile({ person }) {
  const { name, location } = person

  return (
    <div
      className="rounded p-4"
      style={{
        backgroundColor: randomRGBA(),
      }}
    >
      <div className="text-lg font-bold">{name}</div>
      <div className="font-sans">{location}</div>
    </div>
  )
}

const MemoizedObjectProfile = React.memo(ObjectProfile)

export function ObjectParent() {
  const [, setState] = React.useState(false)
  const forceUpdate = () => setState(x => !x)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <Button onClick={forceUpdate}>Force Update</Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ObjectProfile
          person={{ name: 'Kyle Shevlin', location: 'Portland, OR' }}
        />
        <MemoizedObjectProfile
          person={{ name: 'Kyle Shevlin', location: 'Portland, OR' }}
        />
      </div>
    </div>
  )
}

export function RefParent() {
  const [, setState] = React.useState(false)
  const forceUpdate = () => setState(x => !x)
  const personRef = React.useRef({
    name: 'Kyle Shevlin',
    location: 'Portland, OR',
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <Button onClick={forceUpdate}>Force Update</Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ObjectProfile person={personRef.current} />
        <MemoizedObjectProfile person={personRef.current} />
      </div>
    </div>
  )
}

const OtherMemoizedObjectProfile = React.memo(
  ObjectProfile,
  (prevProps, nextProps) => {
    return (
      prevProps.name === nextProps.name &&
      prevProps.location === nextProps.location
    )
  },
)

export function OtherObjectParent() {
  const [, setState] = React.useState(false)
  const forceUpdate = () => setState(x => !x)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <Button onClick={forceUpdate}>Force Update</Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ObjectProfile
          person={{
            name: 'Kyle Shevlin',
            location: 'Portland, OR',
          }}
        />
        <OtherMemoizedObjectProfile
          person={{
            name: 'Kyle Shevlin',
            location: 'Portland, OR',
          }}
        />
      </div>
    </div>
  )
}
