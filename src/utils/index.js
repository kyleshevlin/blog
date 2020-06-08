export const createMediaQuery = breakpoint =>
  `@media (min-width: ${breakpoint})`

export const formatStrForPath = str =>
  str
    .toLowerCase()
    .split(' ')
    .join('-')

export const inflect = (singular, plural, number) =>
  number === 1 ? singular : plural

// Copied from https://github.com/vigour-io/nice-is-email/blob/master/lib/index.js
const EMAIL_PATTERN = /^([^.](?![a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+\.\.)([a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.]+[^.])|([a-zA-Z0-9]{1,2}))@([A-Za-z0-9-]{1,64}\.){1,10}[a-zA-Z]{2,64}$/

export const isEmail = value => {
  return (
    typeof value === 'string' &&
    EMAIL_PATTERN.test(value) &&
    value.indexOf('@') < 65 &&
    value.length < 255
  )
}

export const getNodes = obj => obj.edges.map(edge => edge.node)

const cssVar = prefix => str => `var(--${prefix}${str})`
export const curV = cssVar
export const v = cssVar('')

export const makeHeadingId = heading => {
  // TODO: handle situation where `children` is an array of elements and
  // not just a string.
  if (typeof heading !== 'string') {
    return null
  }

  return heading
    .trim()
    .split(' ')
    .map(x => x.toLowerCase())
    .join('-')
}
