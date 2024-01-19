/**
 * Because ts-pattern uses match/with, I wanted to do something
 * slightly different. I decided to use Ruby's case/when, but since
 * "case" is already a keyword in JavaScript, I'm spelling it "kase"
 */
export function kase(input) {
  // Over time, I've developed a fondness for writing simple closures
  // and so a closure is how we manage the state of our pattern matcher
  let isMatched = false
  let result = undefined

  // I also prefer to avoid using `this` if I can
  // We can do this easily by instantiating the object
  // and referring to it
  const api = {}

  // Our primary way of testing patterns against the input
  // If we get a match, the result is set to the return of the callback
  function when(pattern, callback) {
    if (isMatched) return api

    // This allows us to pass values or a predicate function
    const predicate =
      typeof pattern === 'function'
        ? () => pattern(input)
        : () => pattern === input

    if (predicate()) {
      isMatched = true
      result = callback(input)
    }

    return api
  }

  // Default case handling
  function otherwise(callback) {
    if (isMatched) return result

    return callback(input)
  }

  // If no default case is provided, we need a way to get the result
  function end() {
    return result
  }

  api.when = when
  api.otherwise = otherwise
  api.end = end

  return api
}
