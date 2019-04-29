---
categories: ['JavaScript', 'Web Development', 'Functional Programming']
tags: ['Just Enough FP']
date: '2019-04-08'
slug: 'just-enough-fp-higher-order-functions'
title: 'Just Enough FP: Higher Order Functions'
relatedPostsSlugs: [
  'just-enough-fp-pure-functions',
  'just-enough-fp-immutability',
  'just-enough-fp-currying',
  'just-enough-fp-partial-application',
  'just-enough-fp-argument-order'
]
---

Making sense of functional programming requires a solid understanding of a few fundamental concepts. In my opinion, the first one you need to learn is the concept of "higher order functions".

A higher order function is a function that meets at least one of the following requirements:

- It accepts a function as an argument
- It returns a new function

Functions (and methods) that receive a callback argument are good examples of higher order functions that fulfill the first criterion, such as `map` or `filter` on an array.

A good example fulfilling the second criterion is the `bind` method for functions, which returns a new function ([Here's a link to the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) if you're unfamiliar with `bind`).

Often, a higher order function will fulfill both criteria.

### Why Are Higher Order Functions Useful?

There are several reasons higher order functions useful, including some that I will cover in future blog posts about [_currying_](/just-enough-fp-currying), [_partial application_](/just-enough-fp-partial-application), and _composition_. For now, I'll talk about more general uses of higher order functions.

#### Hiding Implementation Details

The first reason, in my opinion, that higher order functions are useful is that they are a great mechanism for "hiding" and abstracting away implementation details. This is the benefit gained from using higher order functions that receive a function as an argument.

For example, the `map` method mentioned before could be written any number of ways. Do we use a `for` or a `while` loop? How do we manage creating a new array and putting our new values into it? The higher order `map` method means that you, the consumer of the function, don't need to worry about those details. Even better, by using the higher order function, you are automatically opted into any upgrades and improvements that are made to the method.

#### Adding Functionality to an Existing Function

The second reason is to add functionality to already existing functions. The best way to understand this is through an example.

Often when debugging code, I want a fast way to log out to the console the result of a function while still allowing it to return that result, not breaking the call stack.

You could use a `debugger` statement. That might be the best strategy in some situations, but if the function is called a lot, it can be frustrating to have to "step over" so many functions.

You could also manually add the `console.log`, but sometimes that can be very tedious. You gotta save the result to a variable, log it out, _then_ return it. Since higher order functions can receive functions as arguments, what if we make a higher order function that handles these implementation details for us.

```javascript
function logResult(fn) {
  return (...args) => {
    const result = fn(...args)

    console.log(result)

    return result
  }
}
```

Our higher order `logResult` function receives a function as an argument, returns a new function that receives any number of arguments, calls the original function with those arguments, and logs out the result before returning it. Now, if I'm working in some code and want to see the result of a function call without having to store it, I can wrap the function in `logResult` and pass the args to that instead.

```javascript
transformData(data) // Uhh, what does this do?

// We can wrap it with logResult to find out
logResult(transformData)(data) // Oh! That's what it does.
```

Now we can see the result of our `transformData` function every time it is called. Saves us a few steps of saving the result to a variable and logging it out manually every time.

Another example of higher order functions that you might be familiar with are Higher Order Components. Since React components boil down to simple functions, we can enhance them by passing them as arguments to higher order functions.

There are many articles out there on creating Higher Order Components (a style that has fallen out of favor, first with the rise of render props, and now with the advent of Hooks), so I don't feel a need to cover it here.

### Some Additional Thoughts on Higher Order Functions

In JavaScript, a language where functions are first class citizens that can be treated like any other value, higher order functions are really no different than normal functions. The descriptor "higher order" comes from mathematics and it shouldn't concern us very much. Our concern should be understanding how to wield them to improve our programs.

As you grow more comfortable with higher order functions, I'm certain you will find a number of use cases for them. Use your imagination, who knows what you'll come up with.

---

_In this series, I'm going over material from my [Just Enough Functional Programming in JavaScript](https://egghead.io/courses/just-enough-functional-programming-in-javascript) course on egghead. This post is based on the lesson [Modify Functions with Higher Order Functions in JavaScript](https://egghead.io/lessons/javascript-modify-functions-with-higher-order-functions-in-javascript)._

<div style="position: relative; overflow: hidden; padding-top: 56.25%;">
  <iframe style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    "
    src="https://egghead.io/lessons/javascript-modify-functions-with-higher-order-functions-in-javascript/embed" />
</div>