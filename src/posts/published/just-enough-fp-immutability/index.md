---
categories: ['JavaScript', 'Web Development', 'Functional Programming']
tags: ['Just Enough FP']
date: '2019-04-14'
slug: 'just-enough-fp-immutability'
title: 'Just Enough FP: Immutability'
---

Alright, I know that the title of this post already contains some technical jargon that's potentially intimidating. But if you've made it this far, I assure you, you can understand this concept.

Let's define "immutability". Fastest way to do that is to start with its antonym, the word "mutable". Something that is mutable can be changed. Thus, something that is immutable thus cannot be changed.

Mutable data structures can be changed after creation. Immutable data structures cannot. Sweet, that's out of the way.

In functional programming, we make changes to our application's state by returning new data structures with each change, instead of mutating the data directly.

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

