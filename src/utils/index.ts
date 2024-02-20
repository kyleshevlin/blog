export function toSlug(str: string) {
  return str.split(' ').join('-').toLowerCase()
}

interface Entry {
  data: {
    date: string
  }
}

export function byEntryDate(a: Entry, b: Entry) {
  return (
    (new Date(b.data.date) as unknown as number) -
    (new Date(a.data.date) as unknown as number)
  )
}

// Copied from https://github.com/vigour-io/nice-is-email/blob/master/lib/index.js
const EMAIL_PATTERN =
  /^([^.](?![a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+\.\.)([a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.]+[^.])|([a-zA-Z0-9]{1,2}))@([A-Za-z0-9-]{1,64}\.){1,10}[a-zA-Z]{2,64}$/

export const isEmail = (value?: string) => {
  return (
    typeof value === 'string' &&
    EMAIL_PATTERN.test(value) &&
    value.indexOf('@') < 65 &&
    value.length < 255
  )
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function formatPostDate(isoString: string) {
  const [date] = isoString.split('T')
  const [year, month, day] = date.split('-')

  return `${MONTHS[parseInt(month, 10) - 1]} ${day}, ${year}`
}

export const random255 = () => Math.floor(Math.random() * 255)

export const randomRGB = (alpha = 1) => {
  const r = random255()
  const g = random255()
  const b = random255()

  return `rgb(${r}, ${g}, ${b}, ${alpha})`
}

interface EventObj {
  type: string
  [key: string]: unknown
}

export function toEventObject(event: string | EventObj): EventObj {
  if (typeof event === 'string') {
    return { type: event }
  }

  return event
}

export function toArray<T>(value: T) {
  return Array.isArray(value) ? value : [value]
}

interface TransitionObj {
  target: string
  [key: string]: unknown
}

export function toTransitionObject(
  transition: string | TransitionObj,
): TransitionObj {
  return typeof transition === 'string' ? { target: transition } : transition
}

// Simple way to deeply clone an array or object
export const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x))

const HTML_TAGS_PATTERN = /<\/?[a-z]+>/gm

export function sanitize(str: string) {
  return str
    .replaceAll(HTML_TAGS_PATTERN, '')
    .replaceAll('&ldquo;', '"')
    .replaceAll('&rdquo;', '"')
    .replaceAll('&amp;', '&')
}
