import React from 'react'
import { bs } from '../../../shevy'
import Button from '../../../components/Button'

export function Profile({ name, location }) {
  return (
    <div
      css={{
        backgroundColor: 'var(--colors-background)',
        borderRadius: 8,
        padding: bs(),
      }}
    >
      <div css={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{name}</div>
      <div css={{ fontFamily: 'var(--fonts-secondary)' }}>{location}</div>
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
      css={{
        backgroundColor: randomRGBA(),
        borderRadius: 8,
        padding: bs(),
      }}
    >
      <div css={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{name}</div>
      <div css={{ fontFamily: 'var(--fonts-secondary)' }}>{location}</div>
    </div>
  )
}

const MemoizedRandomProfile = React.memo(RandomProfile)

export function Parent() {
  const [, setState] = React.useState(false)
  const forceUpdate = () => setState(x => !x)

  return (
    <>
      <Button onClick={forceUpdate}>Force Update</Button>
      <div
        style={{
          display: 'grid',
          gridGap: bs(),
          gridTemplateColumns: '1fr 1fr',
          marginTop: bs(0.5),
        }}
      >
        <RandomProfile name="Kyle Shevlin" location="Portland, OR" />
        <MemoizedRandomProfile name="Kyle Shevlin" location="Portland, OR" />
      </div>
    </>
  )
}

function ObjectProfile({ person }) {
  const { name, location } = person

  return (
    <div
      css={{
        backgroundColor: randomRGBA(),
        borderRadius: 8,
        padding: bs(),
      }}
    >
      <div css={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{name}</div>
      <div css={{ fontFamily: 'var(--fonts-secondary)' }}>{location}</div>
    </div>
  )
}

const MemoizedObjectProfile = React.memo(ObjectProfile)

export function ObjectParent() {
  const [, setState] = React.useState(false)
  const forceUpdate = () => setState(x => !x)

  return (
    <>
      <Button onClick={forceUpdate}>Force Update</Button>
      <div
        style={{
          display: 'grid',
          gridGap: bs(),
          gridTemplateColumns: '1fr 1fr',
          marginTop: bs(0.5),
        }}
      >
        <ObjectProfile
          person={{ name: 'Kyle Shevlin', location: 'Portland, OR' }}
        />
        <MemoizedObjectProfile
          person={{ name: 'Kyle Shevlin', location: 'Portland, OR' }}
        />
      </div>
    </>
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
    <>
      <Button onClick={forceUpdate}>Force Update</Button>
      <div
        style={{
          display: 'grid',
          gridGap: bs(),
          gridTemplateColumns: '1fr 1fr',
          marginTop: bs(0.5),
        }}
      >
        <ObjectProfile person={personRef.current} />
        <MemoizedObjectProfile person={personRef.current} />
      </div>
    </>
  )
}

const OtherMemoizedObjectProfile = React.memo(
  ObjectProfile,
  (prevProps, nextProps) => {
    return (
      prevProps.name === nextProps.name &&
      prevProps.location === nextProps.location
    )
  }
)

export function OtherObjectParent() {
  const [, setState] = React.useState(false)
  const forceUpdate = () => setState(x => !x)

  return (
    <>
      <Button onClick={forceUpdate}>Force Update</Button>
      <div
        style={{
          display: 'grid',
          gridGap: bs(),
          gridTemplateColumns: '1fr 1fr',
          marginTop: bs(0.5),
        }}
      >
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
    </>
  )
}
