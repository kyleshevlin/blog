const noop = () => {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function memoize<T extends (...args: any[]) => any>(
  fn: T,
  onCacheHit: (cache: Record<string, ReturnType<T>>) => void = noop,
  onCacheMiss: (cache: Record<string, ReturnType<T>>) => void = noop,
) {
  let cache = {} as Record<string, ReturnType<typeof fn>>

  function memoizedFn(...args: Parameters<typeof fn>) {
    const key = args.map(arg => JSON.stringify(arg)).join('---')

    if (cache[key] !== undefined) {
      onCacheHit(cache)
      return cache[key]
    }

    const result = fn(...args)
    cache[key] = result

    onCacheMiss(cache)
    return result
  }

  memoizedFn.reset = () => (cache = {})

  return memoizedFn
}
