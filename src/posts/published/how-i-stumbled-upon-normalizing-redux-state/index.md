---
categories: ['JavaScript', 'Web Development']
tags: ['Redux']
date: "2017-05-18"
slug: "how-i-stumbled-upon-normalizing-redux-state"
status: "publish"
subtitle: "and later learned it's a real thing"
title: "How I Stumbled Upon Normalizing Redux State"
---

My most recent work project was an interesting challenge. I built an app (actually 2 Electron apps supporting 3 React apps communicating through WebSockets) that allowed a user (actually 4 simultaneous users) to look at an array of stories related to sea ports, select one, have a detail component pop up with more information about the story, and then move to the next or previous story from within the detail window.

For each of these actions, a particular story had to be retrieved from the Redux store. In my naive, initial implementation, stories were kept as an array and a simple `.find()` was used to loop through the array and match ids. For those of you who know where I'm going with this, this was a slow solution. For those of you who don't know where I'm going with this, let me explain.

Up until about a year ago, I knew very little of how data structures worked. I just used whatever structure seemed to make the most sense. Like in this example, I have a collection of stories, it seems most obvious to use an array. However, data structures all have pros and cons. One of the cons of an array is how slow a lookup is if you don't know the index of the item. Let me explain why.

Say I have an array with _a lot_ of items (think thousands, for this example). Now imagine that I have to find an item in this array, but the only way I can find it is by checking, one by one, if the current item matches what I'm looking for. It would be like having to search through a filing cabinet, file by file, to find something. It's really slow. In CS terms, this search has a time complexity of O(n), meaning it takes the time of _n_ items to find the right one. So how can we speed this up?

I mentioned that finding an item in an array is faster if you know the index of the item. You go directly to the correct spot and retrieve the item stored there. Does this remind you of another data structure? That's right. An object.

An object stores key/value pairs. If you know the key, you can get the value. This has a time complexity of O(1). Regardless of how many key/value pairs are stored in the object, the lookup is the same speed. So how do we take an array and create an object out of it?

In my situation, this is (roughly) what I did:

```
const array = [
  {
    id: 1,
    title: 'Awesome Story',
    content: 'This is a very awesome story'
  },
  {
    id: 2,
    title: 'Happy Story',
    content: 'This is a happy story :)'
  },
  {
    id: 3,
    title: 'Sad Story',
    content: 'This is a sad story :('
  }
]

// Turn into an object with .reduce()
const objFromArray = array.reduce((accumulator, current) => {
  accumulator[current.id] = current
  return accumulator
}, {})

console.log(objFromArray)
// Logs out
// {
//   1: {
//     id: 1,
//     title: 'Awesome Story',
//     content: 'This is a very awesome story'
//   },
//   2: {
//     id: 2,
//     title: 'Happy Story',
//     content: 'This is a happy story :)'
//   },
//   3: {
//     id: 3,
//     title: 'Sad Story',
//     content: 'This is a sad story :('
//   }
// }

```

Now, to find an item, we do a lookup with the item's `id` property. This is much faster. To do this normalization in Redux, use this logic in your reducer when you receive the array. It is often helpful to maintain an array of the `id`s so you have a list of all the keys, in the correct order, to your new object. In the same reducer logic, `map()` out your keys into an array and define it as a property in your state object. Your state tree will come out looking something like this:

```
const state = {
  stories: {
    // an object that looks like the one logged out from above
  },
  allStoryIds: [
    // an array of each id to use as keys for lookup
  ]
}

```

After I had done all this, my app performed much faster. I don't have statistical breakdown of the data, but it was obvious to everyone. My team did a bunch of "oohs" and "ahhs" when they saw how much faster everything was performing.

### Guess What? I Didn't Make This Up. It's Recommended by Redux

A few weeks later, I came across this: [http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html). This just goes to show you should really read the Redux documentation, doesn't it? If you're looking to normalize your state shape even more, please give that a thorough read and see how it improves the performance of your Redux application.

If you have any questions or comments, leave them below, and let me know of any other ways you have stumbled upon to optimize your Redux state objects.
