---
tags: ['React']
date: '2017-02-16'
slug: 'head-scratcher-1-2d-array-from-array-of-objects'
subtitle: 'Making a 2D Array by Sorting an Array of Objects'
title: 'Head Scratcher #1'
relevantCourseNickname: 'dsa'
---

I am starting a randomly occuring series called "Head Scratchers." At least once a week (probably once a day), I run into a problem that makes me scratch my head for while. So I'm going to share the problem and my solution with you. If you think of a better way to solve the problem, I want to see it in the comments below.

### The Problem

Currently I am building an application for an interactive touch table that will be on a boat. This table will retrieve a number of locations associated with particular ports. The shape of the data (for now) is a bit odd. I can retrieve an array of the locations, but then have to gather them by ports for the user interface. This is what a few example items of this data might look like:

```javascript
// My API endpoint returns an array of objects with ids and a foreign key to a port
;[
  { id: 1, port_id: 3 },
  { id: 2, port_id: 1 },
  { id: 3, port_id: 2 },
  { id: 4, port_id: 1 },
  { id: 5, port_id: 3 },
]
```

If I only had to display these items with their associated port, this would be fine, but the expectation of the user interface is to list them in groups by ports. So, I need to take this array and turn it into a two dimensional array gathered by ports.

### My Solution

I needed to go from a one dimensional array, like `[1,2,3,4,5]`, to a two dimensional array, like `[[1,2],[3],[4,5]]`. I can't accomplish this in one step (as far as I know). I can't use `.map()` since it's not a one-to-one mapping of values. I need a solution that will allow me to create my sub-arrays first, and then push them into a new array.

To start, I decided to use `.reduce()` to turn my array into an object, the keys of which are the `port_id`s and the values for each key are an array of the points of interest objects. That looked like this:

```javascript
const items = [
  { id: 1, port_id: 3 },
  { id: 2, port_id: 1 },
  { id: 3, port_id: 2 },
  { id: 4, port_id: 1 },
  { id: 5, port_id: 3 },
]

const ports = items.reduce((acc, cur) => {
  if (!acc[cur.port_id]) {
    acc[cur.port_id] = []
  }

  acc[cur.port_id].push(cur)

  return acc
}, {})
```

The `.reduce()` method takes a callback and starting value. In this case, I want to start with an empty object. This empty object will be supplied as the `acc` value in the first pass through the function. `acc` stands for "accumulator" as this will be the accumulation of our iterations over each item. `cur` is short for "currentValue", which is the current item being iterated over.

With each pass, if the accumulated object does not have a key that matches the current `port_id`, we create a key of that `port_id` and assign it an empty array. Regardless of whether the array needed to be created, we will be pushing the current item into the array associated with the `port_id`. We then must return the accumulator to be used in the next iteration of the function. When this runs over our `items`, should have an object that looks like this:

```javascript
console.log(ports)

// {
//   1: [{ id: 2, port_id: 1 }, { id: 4, port_id: 1 }],
//   2: [{ id: 3, port_id: 2 }],
//   3: [{ id: 1, port_id: 3 }, { id: 5, port_id: 3 }]
// }
```

Now we have an object whose keys are paired with values that will be the subarrays of our two dimensional arrays. We want those values, and we want them in an array. There happens to be a new method on the JavaScript primitive `Object` that will do just that, the `.values()` method.

`Object.values(obj)` returns an array containing the values of the enumerable properties of your object. Since our values happen to all be arrays, we will end up with an array of arrays. Using this method looks like this:

```javascript
const twoDimItems = Object.values(ports)
console.log(twoDimItems)

// [[{ id: 2, port_id: 1 }, { id: 4, port_id: 1 }], [{ id: 3, port_id: 2 }], [{ id: 1, port_id: 3 }, { id: 5, port_id: 3 }]]
```

Now I have a two dimensional array gathered by ports. Since I mentioned that this is necessary, I might as well explain my needs there.

Each of these items, individually, will represent a `Card` of information. I need a list of these `Card`s gathered by their ports, thus I have `CardGroup`s. Each `CardGroup` displays a list of its `Card`s. Lastly, I have a `CardGroupsList` that displays all my groups. It's a cascade of lists, and thus, my UI is a mapping over the outer array, followed by mapping each inner array. With React stateless functional components, that looks like this:

```javascript
const Card = ({ item }) => <div className="card">{item.id}</div>

const CardGroup = ({ group }) => (
  <div className="card_group">
    {group.map(item => (
      <Card item={item} />
    ))}
  </div>
)

const CardGroupsList = ({ groups }) => (
  <div className="card_groups_list">
    {groups.map(group => (
      <CardGroup group={group} />
    ))}
  </div>
)
```

### Conclusion

And that's how I turned one array into a two dimensional array sorted by a foreign key. I'll leave it to you to figure out how all the pieces fit together with the React components. I hope it's clear how I came to my solution. If you can think of a better solution, leave it in the comments (or create a Gist and link to it, might be easier). I'd love an opportunity to learn from one of you.
