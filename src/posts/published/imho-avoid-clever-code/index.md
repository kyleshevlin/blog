---

date: '2016-12-03'
slug: 'imho-avoid-clever-code'
subtitle: 'or Code is for Humans, Not for Computers'
title: 'IMHO: Avoid Clever Code'
---

Yesterday, I was poring through some code when I came across a pattern I hadn't seen used in JavaScript before. The pattern looked like this:

```javascript
const foo = true // or any value that can be truthy or falsy
const bar = () => {
  console.log('Hey!')
}

// And then later in the code, I found a bunch of one liners like this
foo && bar()

// 'Hey!'
```

This pattern takes advantage of how logical operators work. In the case of `&&`, when the left side is true, the runtime evaluates the right side. Since an `&&` requires both sides to be `true` to return `true`, it only evaluates and runs the right side _if_ the left side is true. Essentially, the developer created a shorthand if/then statement. If the code was written conventionally, instead of `foo && bar()`, it would have looked like this:

```javascript
if (foo) {
  bar()
}
```

_In my opinion_, the conventional way should be used over the "clever" pattern every time. Why? Legibility.

The pattern in question here, is a slight abuse of logical operators and requires the coder to understand how logical operators work at a language level in order to properly understand what is taking place in the code. The coder has to understand that JavaScript (and other programming languages) have made optimizations that do not run the right side of an `&&` statement if the left side evaluates to `false`. On the other hand, the conventional way reads as one would literally construct it in their mind: "If `foo` is `true`, then `bar()`".

Developers are an efficient group of people. I understand the desire to search for shorter, more efficient patterns, but we must always remember that the code we write is intended to be legible to humans, not to computers.

"But Kyle, we're writing code to be _consumed_ by computers! Shouldn't we write for them?!"

Sure, our code is consumed by computers, but they can read code no human can understand. We have processors and transpilers and so on that mangle our code, making it completely illegible to a person while optimizing it for computers. Thus, any cleverness done by us, and gain made from it, is undone by post-processing our files. That's a good thing!

This means that we can write code that any developer can immediately understand making our projects more accessible. And accessible projects lead to more successful projects.
