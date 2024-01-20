import React from 'react'
import { Button } from '../../../components/Button'
import { Input, useInput } from '../../../components/Inputs'
import type { Todo } from '../../../types'

const compound = (amount: number, rate: number) => amount + amount * rate

const to2 = (num: number) => Number(num.toFixed(2))

function* makePayment(principal: number, rate: number, payment: number) {
  // Student loans compound daily, so we create a daily interest rate
  // by dividing our annual rate with the number of days in a year
  const dailyInterestRate = rate / 365
  let remaining = principal
  let totalInterestPaid = 0
  let paymentsCount = 0

  while (remaining > 0) {
    const beginWith = remaining
    let endWith = remaining

    // For simplification, we're going to treat each payment period
    // as 30 days long
    for (let i = 0; i < 30; i++) {
      endWith = compound(endWith, dailyInterestRate)
    }

    // Student loans pay the accrued interest first, then the principal
    // We're keeping this formula rudimentary, but this let's us see what
    // interest accrued since the last payment
    const interestAccrual = to2(endWith - beginWith)
    totalInterestPaid = to2(totalInterestPaid + interestAccrual)

    endWith = to2(endWith - payment)
    remaining = to2(endWith)
    paymentsCount++

    if (endWith < 0) {
      endWith = 0
      remaining = 0

      return {
        beginWith,
        endWith,
        interestAccrual,
        paymentsCount,
        totalInterestPaid,
      }
    }

    yield {
      beginWith,
      endWith,
      interestAccrual,
      paymentsCount,
      totalInterestPaid,
    }
  }
}

const getNewPaymentGenerator = (
  principal: number,
  rate: number,
  payment: number,
) => makePayment(principal, rate, payment)

export default function SimplePayment() {
  const [principal, onPrincipalChange] = useInput('46000')
  const [rate, onRateChange] = useInput('0.05')
  const [payment, onPaymentChange] = useInput('1500')
  const [data, setData] = React.useState<Todo>(null)
  const [done, setDone] = React.useState(false)
  const genRef = React.useRef(
    getNewPaymentGenerator(Number(principal), Number(rate), Number(payment)),
  )

  const step = () => {
    const nextData = genRef.current.next()
    setData(nextData)
    if (nextData.done) {
      setDone(true)
    }
  }

  const reset = React.useCallback(() => {
    genRef.current = getNewPaymentGenerator(
      Number(principal),
      Number(rate),
      Number(payment),
    )
    setData(null)
  }, [principal, rate, payment])

  React.useEffect(() => {
    reset()
  }, [reset])

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-sans font-bold">Simple Payment Generator</h4>

      <div className="flex flex-col gap-2">
        <Input
          label="Principal"
          onChange={onPrincipalChange}
          value={principal}
        />
        <Input label="Interest Rate" onChange={onRateChange} value={rate} />
        <Input label="Payment" onChange={onPaymentChange} value={payment} />
      </div>

      <div className="flex gap-2">
        <Button disabled={done} onClick={step}>
          Make Payment
        </Button>

        <Button onClick={reset}>Reset</Button>
      </div>

      {data && (
        <pre className="bg-gray-200 dark:bg-gray-700">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}
