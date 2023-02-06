import { Flex } from '@kyleshevlin/layout'
import React from 'react'
import shevy, { bs } from '../shevy'

import LinkButton from './LinkButton'

export function TrainingPitch() {
  return (
    <div
      css={{
        backgroundColor: 'var(--components-trainingPitch-background)',
        color: 'var(--components-trainingPitch-text)',
        fontFamily: 'var(--fonts-secondary)',
        padding: bs(2),
      }}
    >
      <Flex direction="column" gap={1}>
        <div
          css={{
            fontSize: shevy.h2.fontSize,
            lineHeight: shevy.h2.lineHeight,
          }}
        >
          Are you, or the company you work for, struggling with something
          mentioned in this&nbsp;article?
        </div>

        <div
          css={{ fontSize: shevy.h4.fontSize, lineHeight: shevy.h4.lineHeight }}
        >
          Would you benefit from a live training session?
        </div>

        <div>
          <LinkButton
            variant="bigWide"
            overrideStyles={{
              backgroundColor:
                'var(--components-trainingPitch-submitButton-background)',
              color: 'var(--components-trainingPitch-submitButton-text)',

              '&:hover': {
                backgroundColor:
                  'var(--components-trainingPitch-submitButton-hover-background)',
                color:
                  'var(--components-trainingPitch-submitButton-hover-text)',
              },
            }}
            href="mailto:kyle@kyleshevlin.com"
          >
            Let's Talk
          </LinkButton>
        </div>
      </Flex>
    </div>
  )
}
