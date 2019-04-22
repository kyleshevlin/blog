---
categories: ['JavaScript', 'Web Development', 'Functional Programming']
tags: ['Just Enough FP']
date: '2019-04-21'
slug: 'just-enough-fp-immutability'
title: 'Just Enough FP: Immutability'
---

Alright, I know that the title of this post already contains some technical jargon that's potentially intimidating. But if you've made it this far, I assure you, you can understand this concept.

Let's define "immutability". The fastest way to do that is to start with its antonym--"mutability". Mutability comes from "mutable". Something that is mutable **can be changed**. Thus, something that is immutable **cannot be changed**.

Mutable data structures can be changed after creation, aka mutated. Immutable data structures cannot.

You might be asking yourself, how do you make changes to data that can't be changed? Good question.

In functional programming, instead of mutating the data directly, we make changes to our data by returning a new data structure with the correct values to reflect that change. Let me give you some examples involving an object. In this first example, I'll mutate the data.

```javascript
const me = { name: 'Kyle', age: 33 }

// I recently had a birthday, let's increase my age mutably
me.age++
console.log(me) // { name: 'Kyle', age: 34 }
```

We have directly modified the value at `me.age` with a mutation. While we still have the same object (the reference hasn't changed), we have permanently changed the contents of the object. This is sometimes referred to as a _destructive operation_, because it does not leave the original object intact during the operation. In this second example, I'll modify the age immutably now:

```javascript
const me = { name: 'Kyle', age: 33 }

// I recently had a birthday, let's increase my age immutably
const olderMe = Object.assign({}, me, { age: 34 })

console.log(olderMe) // { name: 'Kyle', age: 34 }
```

In this case, I create a brand new object and merge the old properties with the new ones to get the correct data structure. I still have access to the `me` object and now the `olderMe` object. `olderMe` reflects the changes we wanted to make to the data.

### A Case Study: Array.prototype.sort()

A lot of our work involves manipulating arrays of data. You might find that after getting very accustomed to using declarative immutable methods like `map` and `filter`, you find yourself reaching for `sort` and **BOOM** 💥 you've mutated your underlying data permanently without intending to.

`Array.prototype.sort` is a destructive array method, performing the sort "in place" on the original array itself. I'll get into why this is the case in a little bit. First, let's observe what I mean.

If I have an array of numbers and call sort on it, the reference to that array doesn't change.

```javascript
const arr = [5, 3, 2, 4, 1]
const arr2 = arr.sort()

console.log(arr) // [1, 2, 3, 4, 5]
console.log(arr2) // [1, 2, 3, 4, 5]
console.log(arr === arr2) // true, each variable references the same array
```

Sorting mutably might be exactly what you want if you never need to use the array to derive any other data from it. However, often you'll want to keep the original array intact for other purposes. Perhaps you have a table of data derived from a collection of objects, rather than mutate the array each time you need to sort it in a different way, it might be best to create a brand new array with the sort applied. Let's create a `safeSort` function to do this. I'm going to use a _curried function_ to do so, which I will cover in a future blog post.

```javascript
const arr = [5, 3, 2, 4, 1]

/* If you are unfamiliar with currying, this will look confusing, but break
 * it down into steps and it's pretty easy to understand.
 *
 * 1. The first argument is the optional comparator function the `sort`
 * method receives. This returns a new function.
 *
 * 2. The second argument (the first of the second function) is our array
 * to operate on. This implicity returns the value to the right of the =>
 *
 * 3. We create a new array and spread the items of the original array into it
 * so as not to make any mutations to the orginal array.
 *
 * 4. We now perform the sort operation on the _new array_, leaving the old
 * one intact
 */
const safeSort = comparator => array => [...array].sort(comparator)

const arr2 = safeSort()(arr)

console.log(arr) // [5, 3, 2, 4, 1]
console.log(arr2) // [1, 2, 3, 4, 5]
console.log(arr === arr2) // false
```

Now our `safeSort` sorts the contents of our array without making any changes to the original, returning to us a brand new array reflecting our changes. Thus, we have made an immutable change to our data.

### Implications

I wanted to take a moment to point out the tradeoffs being made between mutable and immutable data structures. Now, I am no expert in computer science, so I will give you the best information I have, but I want it to be clear there might be some cases where the generalizations I make here are wrong.

Mutations, and thus mutable data structures, have some great benefits. Mutating data models how we understand the world. When we make changes to something, we change _that thing_, we don't return a new copy with the changes applied. One of my favorite metaphors is drinking a glass of water. When we take a sip, we mutate the amount of water in the glass, and we mutate the amount of water in ourselves.

Mutations also tend to be great for performance, as the operations happen in place. They do not require new structures to be created in memory, or old structures to be garbage collected. For example, in video games, often game developers will create a "pool" of enemies, a set number of enemy objects, and then mutate the objects in that pool to reflect which enemies are alive and dead. Under the hood, you might kill an enemy and the program collects that dead object, mutates new life onto it and sends it back at you as a "new" enemy. You think you're being attacked by a new enemy, but in reality, that reference is the same reference as the old enemy.

There are downsides to mutations. First, the destructive nature of the operations can lead to complications, especially regarding situations where we might need to undo operations. Also, mutations can lead to difficulties with state management. What if two operations attempt to change the same data concurrently? Which one takes precedent? What data will we get back in return? Bugs from mutations can often be some of the hardest to track down and fix.

Immutability, and thus immutable data structures, also have some great benefits. Making changes to immutable data structures often leads to very prescriptive, easy to understand (albeit often verbose) changes to data. This methodology allows us to gain levels of certainty about our programs that mutations don't inherently give us. The popular state management library Redux is based on immutability, because this gives us the ability to serialize our state and use it for things like time-travel debugging and very simple undo/redo abilities.

The biggest downside to immutability has to do with memory consumption. Creating new data structures for each change _can_ have an effect on performance, though be certain to benchmark your performance and verify before worrying about this too much. Most modern systems have ample memory for many of the operations you and I are doing in our web applications.

### Conclusion

Understanding the difference between mutable and immutable data structures is very useful information. Being able to look at code and recognize mutations will really help you understand what transformations your data is going through and may even help you spot a bug or two.

In functional programming, we require immutable changes because of the purity of our functions. Mutations cannot make the guarantees immutable data can. Mutations can lead to inconsistent results and/or side effects, and we can't have that if we're really going to unlock the power of functions in coming posts.

---

_In this series, I'm going over material from my [Just Enough Functional Programming in JavaScript](https://egghead.io/courses/just-enough-functional-programming-in-javascript) course on egghead. This post is based on the lesson [Avoiding Mutations in JavaScript with Immutable Data Structures](https://egghead.io/lessons/javascript-avoiding-mutations-in-javascript-with-immutable-data-structures)._

<div style="position: relative; overflow: hidden; padding-top: 56.25%;">
  <iframe style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    "
    src="https://egghead.io/lessons/javascript-avoiding-mutations-in-javascript-with-immutable-data-structures/embed" />
</div>
