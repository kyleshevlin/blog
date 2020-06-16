const noop = () => {}

export default function memoize(fn, onCacheHit = noop, onCacheMiss = noop) {
  const cache = {}

  return (...args) => {
    const key = args.map(JSON.stringify).join('---')

    if (cache[key] !== undefined) {
      onCacheHit(cache)
      return cache[key]
    }

    const result = fn(...args)
    cache[key] = result

    onCacheMiss(cache)
    return result
  }
}
