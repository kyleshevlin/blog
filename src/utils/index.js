export const createMediaQuery = breakpoint =>
  `@media (min-width: ${breakpoint})`

export const formatStrForPath = str =>
  str
    .toLowerCase()
    .split(' ')
    .join('-')

export const inflect = (singular, plural, number) =>
  number === 1 ? singular : plural
