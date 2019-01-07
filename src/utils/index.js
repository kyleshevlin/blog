export const createMediaQuery = breakpoint =>
  `@media (min-width: ${breakpoint})`

export const formatStrForPath = str =>
  str
    .toLowerCase()
    .split(' ')
    .join('-')
