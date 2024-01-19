import React from 'react'
import { Button } from '../../../components/Button'

const noop = () => {}

export function Card1() {
  return (
    <Wrap>
      <Section>
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-xl font-bold">Card Title</h4>
          <div>
            This is a card. It contains information and a call to action at the
            bottom.
          </div>
        </div>
      </Section>
      <Divider />
      <Section>
        <Button onClick={noop}>Click me</Button>
      </Section>
    </Wrap>
  )
}

export function Card2() {
  return (
    <Wrap>
      <Section>
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-xl font-bold">Card Title</h4>
          <div>
            This is a card. It contains information and two calls to action at
            the bottom.
          </div>
        </div>
      </Section>
      <Divider />
      <Section>
        <div className="flex gap-4">
          <Button className="shrink grow basis-1/2" onClick={noop}>
            Click me
          </Button>
          <Button className="shrink grow basis-1/2" onClick={noop}>
            Click me, too
          </Button>
        </div>
      </Section>
    </Wrap>
  )
}

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[40ch] rounded-xl border-2 border-gray-300 font-sans">
      {children}
    </div>
  )
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4">
      <div className="flex flex-col">{children}</div>
    </div>
  )
}

function Divider() {
  return <div className="border-t-2 border-t-gray-300" />
}

export function CardWithChildren({
  body,
  children,
  title,
}: {
  body: React.ReactNode
  children?: React.ReactNode
  title: string
}) {
  return (
    <Wrap>
      <Section>
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-xl font-bold">{title}</h4>
          <div>{body}</div>
        </div>
      </Section>

      {children && (
        <>
          <Divider />
          <Section>{children}</Section>
        </>
      )}
    </Wrap>
  )
}

function CardWithSlots({
  body,
  footer,
  header,
  title,
}: {
  body: React.ReactNode
  footer: React.ReactNode
  header: React.ReactNode
  title: string
}) {
  return (
    <Wrap>
      {header && (
        <>
          <Section>{header}</Section>
          <Divider />
        </>
      )}

      <Section>
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-xl font-bold">{title}</h4>
          <div>{body}</div>
        </div>
      </Section>

      {footer && (
        <>
          <Divider />
          <Section>{footer}</Section>
        </>
      )}
    </Wrap>
  )
}

export function CardWithSlotsExample() {
  return (
    <CardWithSlots
      body="Here is an example body text."
      header={<div className="flex justify-center">EXAMPLE</div>}
      footer={
        <div className="min-w-[30ch]">
          <div className="flex justify-between">
            <Button onClick={() => {}}>Click Me</Button>
            <Button onClick={() => {}}>Click Me, too</Button>
          </div>
        </div>
      }
      title="Example Title"
    />
  )
}
