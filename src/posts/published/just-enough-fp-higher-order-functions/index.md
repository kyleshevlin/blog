---
date: '2019-04-08'
slug: 'just-enough-fp-higher-order-functions'
title: 'Just Enough FP: Higher Order Functions'
---

Making sense of functional programming requires a solid understanding of a few fundamental concepts. In my opinion, the first one you need to learn is the concept of "higher order functions".

A higher order function (which I will abbreviate as HOF going forth) is a function that meets at least one of the following requirements:

- It accepts a function as an argument
- It returns a new function

Functions (and methods) that receive a callback argument are good examples of HOFs that fulfill the first criterion, such as `.map()` or `.filter()` on an array.

A good example fulfilling the second criterion is the `.bind()` method for functions, which returns a new function (Read the following if you're unfamiliar with `bind()` [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)).

Often, a HOF will fulfill both criteria.

### Why are HOFs useful?
