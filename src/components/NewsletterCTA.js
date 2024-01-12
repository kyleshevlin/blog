import React from 'react'
import { createMachine } from 'xstate'
import { useMachine } from '@xstate/react'
import shevy from '../shevy'
import { getButtonStyles } from './Button'
import { isEmail } from '../utils'
import { Flex, FlexItem, useSpacing } from '@kyleshevlin/layout'

export default function NewsletterCTA() {
  const bs = useSpacing()

  return (
    <div
      css={{
        backgroundColor: 'var(--components-newsletterCTA-background)',
        borderRadius: 8,
        color: 'var(--components-newsletterCTA-text)',
        padding: bs(2),
      }}
    >
      <div>
        <h3>Sign up for my Newsletter</h3>

        <p>
          Let's chat more about TypeScript, React, and more. Unsubscribe at
          any&nbsp;time.
        </p>

        <SignupForm />
      </div>
    </div>
  )
}

const API_KEY = process.env.GATSBY_BUTTONDOWN_EMAIL_API_KEY

async function postNewSubscriber({ email, name }) {
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
      }
    )

    if (!response.ok) return Promise.reject()

    const json = await response.json()

    return Promise.resolve(json)
  } catch (error) {
    console.error(error)
    throw new Error(
      'Something went wrong while attempting to subscribe you to the newsletter'
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
          onError: 'failure',
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
          RETRY: 'submitting',
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
  }
)

function SignupForm() {
  const bs = useSpacing()

  const [nameChange, name] = useInput()
  const [emailChange, email] = useInput()
  const [state, send] = useMachine(signupMachine)

  const handleSubmit = e => {
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

      case state.matches('failure'):
        return 'Retry'

      default:
        return 'Submit'
    }
  }

  if (state.matches('success')) {
    return (
      <div
        css={{
          backgroundColor:
            'var(--components-newsletterCTA-successBox-background)',
          borderRadius: 4,
          color: 'var(--components-newsletterCTA-successBox-text)',
          fontFamily: 'var(--fonts-secondary)',
          padding: bs(1),
        }}
      >
        Thank you for subscribing to the newslettter. I appreciate it. Please
        check your inbox to confirm your subscription.
      </div>
    )
  }

  return (
    <Flex direction="column" gap={1}>
      {state.matches('error') && (
        <ErrorWrap>Invalid name or email. Please try again.</ErrorWrap>
      )}

      {state.matches('failure') && (
        <ErrorWrap>
          Something went wrong while submitting the form. Please try again.
        </ErrorWrap>
      )}

      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap={1}>
          <Flex gap={1}>
            <FlexItem grow={1} shrink={1}>
              <ControlledInputBox
                label="First Name"
                name="firstName"
                onChange={nameChange}
                placeholder="You"
                value={name}
              />
            </FlexItem>

            <FlexItem grow={1} shrink={1}>
              <ControlledInputBox
                label="Email Address"
                name="email"
                onChange={emailChange}
                placeholder="you@example.com"
                value={email}
              />
            </FlexItem>
          </Flex>

          <button
            css={{
              ...getButtonStyles(bs),
              backgroundColor:
                'var(--components-newsletterCTA-submitButton-background)',
              color: 'var(--components-newsletterCTA-submitButton-text)',
              fontSize: '1.25rem',
              padding: `${bs(0.5)} ${bs(0.75)}`,
              width: '100%',

              '&:hover': {
                backgroundColor:
                  'var(--components-newsletterCTA-submitButton-hover-background)',
                color:
                  'var(--components-newsletterCTA-submitButton-hover-text)',
              },
            }}
            type="submit"
          >
            {getSubmitButtonText()}
          </button>
        </Flex>
      </form>
    </Flex>
  )
}

const NEXT_DOTS = {
  '': '.',
  '.': '. .',
  '. .': '. . .',
  '. . .': '',
}

function Dots() {
  const [dots, setDots] = React.useState('')

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setDots(d => NEXT_DOTS[d])
    }, 350)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div
      css={{
        display: 'inline-block',
        textAlign: 'center',
        width: 30,
      }}
    >
      {dots}
    </div>
  )
}

function ErrorWrap({ children }) {
  const bs = useSpacing()

  return (
    <div
      css={{
        backgroundColor: 'var(--components-newsletterCTA-errorBox-background)',
        borderRadius: 4,
        color: 'var(--components-newsletterCTA-errorBox-text)',
        fontFamily: 'var(--fonts-secondary)',
        padding: bs(0.5),
      }}
    >
      {children}
    </div>
  )
}

function ControlledInputBox({
  label,
  name,
  onChange,
  placeholder,
  type = 'text',
  value,
}) {
  const bs = useSpacing()

  return (
    <div css={{ fontFamily: 'var(--fonts-secondary)' }}>
      <label htmlFor={name}>
        <div
          css={{
            fontSize: shevy.h4.fontSize,
            marginBottom: bs(0.25),
          }}
        >
          {label}
        </div>
        <input
          css={{
            backgroundColor:
              'var(--components-newsletterCTA-inputs-background)',
            border: 'none',
            borderRadius: 4,
            color: 'var(--components-newsletterCTA-inputs-text)',
            padding: bs(0.5),
            width: '100%',

            '&::placeholder': {
              color: 'var(--components-newsletterCTA-inputs-placeholderText)',
            },
          }}
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

function useInput() {
  const [value, setValue] = React.useState('')

  const onChange = e => {
    setValue(e.target.value)
  }

  return [onChange, value]
}
