import { OurInput, OurInputStyleProvider } from './_OurInput'

export function Example1() {
  return <OurInput id="ours" label="Our Input Component" />
}

export function Example2() {
  return (
    <OurInputStyleProvider variant="showOptionals">
      <OurInput id="ours" label="Our Input Component" />
    </OurInputStyleProvider>
  )
}

export function Example3() {
  return (
    <OurInputStyleProvider variant="showRequireds">
      <OurInput id="ours" label="Our Input Component" required />
    </OurInputStyleProvider>
  )
}
