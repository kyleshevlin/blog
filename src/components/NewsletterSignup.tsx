import { useMachine } from '@xstate/react'
import React, { type ChangeEvent } from 'react'
import { createMachine } from 'xstate'
import { isEmail } from '../utils'

export function NewsletterSignup() {
  return (
    <div className="rounded bg-gradient-to-br from-rose-500 via-pink-500 to-accent p-8 text-white shadow-md xl:p-10">
      <div className="flex flex-col gap-4 xl:gap-6">
        <div className="font-sans text-2xl leading-none xl:text-3xl">
          Sign up for my newsletter
        </div>

        <div>
          Let&apos;s chat some more about TypeScript, React, and frontend web
          development. Unsubscribe at any&nbsp;time.
        </div>

        <SignupForm />
      </div>
    </div>
  )
}

const API_KEY = import.meta.env.PUBLIC_BUTTONDOWN_EMAIL_API_KEY

async function postNewSubscriber({
  email,
  name,
}: {
  email: string
  name: string
}) {
  try {
    const response = await fetch(
      'https://api.buttondown.email/v1/subscribers',
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          metadata: {
            name,
          },
          tags: ['From kyleshevlin.com'],
        }),
      },
    )

    const json = await response.json()

    if (!response.ok) return Promise.reject(json)

    return Promise.resolve(json)
  } catch (error) {
    console.error(error)
    throw new Error(
      'Something went wrong while attempting to subscribe you to the newsletter',
    )
  }
}

const submitEvent = {
  SUBMIT: [
    {
      target: 'submitting',
      cond: 'isValidData',
    },
    { target: 'error' },
  ],
}

const signupMachine = createMachine(
  {
    predictableActionArguments: true,
    id: 'signup',
    initial: 'idle',
    states: {
      idle: {
        on: {
          ...submitEvent,
        },
      },
      submitting: {
        invoke: {
          id: 'submitData',
          src: 'submitData',
          onDone: 'success',
          onError: [
            {
              target: 'alreadySubscribed',
              cond: (_, event) => event.data.code === 'email_already_exists',
            },
            { target: 'failure' },
          ],
        },
      },
      alreadySubscribed: {
        on: {
          ...submitEvent,
        },
      },
      error: {
        on: {
          ...submitEvent,
        },
      },
      success: {},
      failure: {
        on: {
          ...submitEvent,
        },
      },
    },
  },
  {
    guards: {
      isValidData: (_, event) => {
        const { email, name } = event

        if (email === '' || name === '') return false
        return isEmail(email)
      },
    },
    services: {
      submitData: (_, event) => {
        const { email, name } = event
        return postNewSubscriber({ email, name })
      },
    },
  },
)

function SignupForm() {
  const [nameChange, name] = useInput()
  const [emailChange, email] = useInput()
  const [state, send] = useMachine(signupMachine)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    send({ type: 'SUBMIT', name, email })
  }

  const getSubmitButtonText = () => {
    switch (true) {
      case state.matches('submitting'):
        return (
          <>
            <Dots /> Submitting
          </>
        )

      case state.matches('alreadySubscribed'):
      case state.matches('failure'):
        return 'Retry'

      default:
        return 'Sign Up'
    }
  }

  if (state.matches('success')) {
    return (
      <div className="rounded bg-white p-4 font-sans text-black">
        Thank you for subscribing to the newslettter. I appreciate it. Please
        check your inbox to confirm your subscription.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {state.matches('error') && (
        <ErrorWrap>Invalid name or email. Please try again.</ErrorWrap>
      )}

      {state.matches('alreadySubscribed') && (
        <ErrorWrap>
          You&apos;re already subscribed to the newsletter. Please check your
          inbox to confirm your subscription.
        </ErrorWrap>
      )}

      {state.matches('failure') && (
        <ErrorWrap>
          Something went wrong while submitting the form. Please try again.
        </ErrorWrap>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="shrink grow">
              <ControlledInputBox
                label="First Name"
                name="firstName"
                onChange={nameChange}
                placeholder="You"
                value={name}
              />
            </div>

            <div className="shrink grow">
              <ControlledInputBox
                label="Email Address"
                name="email"
                onChange={emailChange}
                placeholder="you@example.com"
                value={email}
              />
            </div>
          </div>

          <button
            className="w-full rounded bg-white px-4 py-3.5 font-sans text-lg font-bold uppercase leading-none text-accent shadow-md transition-all hover:bg-gray-100"
            type="submit"
          >
            {getSubmitButtonText()}
          </button>
        </div>
      </form>
    </div>
  )
}

const NEXT_DOTS = {
  '': '.',
  '.': '. .',
  '. .': '. . .',
  '. . .': '',
} as const

function Dots() {
  const [dots, setDots] = React.useState<keyof typeof NEXT_DOTS>('')

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setDots(d => NEXT_DOTS[d])
    }, 350)

    return () => clearInterval(intervalId)
  }, [])

  return <div className="inline-block w-[30px] text-center">{dots}</div>
}

function ErrorWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded bg-white/90 p-4 font-sans text-lg text-red-500 shadow-md">
      {children}
    </div>
  )
}

type ControlledInputBoxProps = {
  label: string
  name: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  type?: HTMLInputElement['type']
  value: string
}

function ControlledInputBox({
  label,
  name,
  onChange,
  placeholder,
  type = 'text',
  value,
}: ControlledInputBoxProps) {
  return (
    <div className="font-sans">
      <label htmlFor={name}>
        <div className="mb-2 text-xl">{label}</div>
        <input
          className="w-full rounded border-0 bg-white p-2 font-sans text-black placeholder:text-gray-300"
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </label>
    </div>
  )
}

type UseInputResult = [(e: ChangeEvent<HTMLInputElement>) => void, string]

function useInput(): UseInputResult {
  const [value, setValue] = React.useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return [onChange, value]
}
