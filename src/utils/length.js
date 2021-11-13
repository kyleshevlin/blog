export const makeLength = (amount, type) => ({ amount, type })

export const formatLength = ({ amount, type }) => `${amount}${type}`

export const modifyLength = (modifier, measure) => {
  const { amount, type } = measure
  const newAmount = modifier(amount)

  return makeLength(newAmount, type)
}
