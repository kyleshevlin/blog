---
tags: ['Redux']
date: '2016-11-16'
slug: 'state-snapshots-in-redux'
title: 'State Snapshots in Redux'
coverImage: './images/redux_logo_2.png'
---

[Redux](http://redux.js.org/) is a predictable state container for JavaScript apps. I've been using it in all of my apps recently and I discovered an elegant and clever use of it that I want to share. The rest of this article assumes you know how to use Redux. If you do not, follow the link above and read up before continuing this one.

### The Problem I Was Solving

In one particular app I am working on, the UI depends upon state to determine the correct layout and color scheme. I have several elements (a logo, heading, and footer) that each are colored based on several booleans kept in state. When certain actions are taken, such as opening the nav, I need to change the state of those items. If the user were to close the nav without selecting a link, I need those elements to return back to the state they were in.

The first, most obvious solution was too simply fire actions that would change the color of each individual piece of UI like I had when opening the nav. This proved problematic. While I knew with certainty what state the UI should be in when the nav was open, I was not sure what state the UI should return to when the nav was closed. Trying to accommodate for every potential scenario would not only have been tedious, but buggy at best. Any new page in the app would have to be coded for. Then the solution dawned on me.

### Snapshots

I could create a snapshot of any part of my state object, store it within that same state object, and then use its values to replace my current state at any given time. It's first-level "Inception" for your state.

This creating and applying a snapshot of state became a significant feature of the app as it was a much better way for returning to a previous state than my other efforts. Let's walk through the code to accomplish this.

### The Code

Any Redux app requires a few things:

- An initial state
- Actions to dispatch and change state
- Reducers to handle actions and return a new state object

Before I start tackling changing state, I like to consider what my initial state is. Generally, I define my initialState in the reducer file it belongs to, but for the sake of this article, I'm going to be repetitious, showing you what your initial state might look like and then copy/paste this into my reducer where it normally would be. Without further adieu, or initial state:

```javascript
const initialState = {
  headingIsLight: false,
  logoIsLight: false,
  footerIsLight: true,
  navIsOpen: false,
  uiSnapshot: null
}
```

We've added on particular property of interest to us, the `uiSnapshot` property. We're going to use this key to store pieces of our state. Since this is the initial state, we can set it to `null` for the time being (and will later see that this has an added benefit).

Next, we need actions to dispatch to our reducers. There are a number of strategies for handling action creators and action types out there and I'll leave it to you to research them. For now, I've been using an `actionTypes.js` file for all my types, and then creating action creators under an `actions` directory.

```javascript
// actionTypes.js
export const OPEN_NAV = 'OPEN_NAV'
export const CLOSE_NAV = 'CLOSE_NAV'
export const TAKE_UI_SNAPSHOT = 'TAKE_UI_SNAPSHOT'
export const APPLY_UI_SNAPSHOT = 'APPLY_UI_SNAPSHOT'

// actions/ui.js
import {
  OPEN_NAV,
  CLOSE_NAV,
  TAKE_UI_SNAPSHOT,
  APPLY_UI_SNAPSHOT
} from './actionTypes'

export function openNav() {
  return { type: OPEN_NAV }
}

export function closeNav() {
  return { type: CLOSE_NAV }
}

export function takeUISnapshot() {
  return { type: TAKE_UI_SNAPSHOT }
}

export function applyUISnapshot() {
  return { type: APPLY_UI_SNAPSHOT }
}
```

Before we dispatch actions, we need reducers to handle them (and technically we need reducers to create a `store` to even `dispatch` our actions). So next we create a reducer to define how we handle each of our action types:

```javascript
import {
  OPEN_NAV,
  CLOSE_NAV,
  TAKE_UI_SNAPSHOT,
  APPLY_UI_SNAPSHOT
} from './actionTypes'

// Our initial state from before
const initialState = {
  headingIsLight: false,
  logoIsLight: false,
  footerIsLight: true,
  navIsOpen: false,
  uiSnapshot: null
}

const reducer = (state = initialState, action) {
  switch (action.type) {
    case OPEN_NAV:
      return Object.assign({}, state, {
        navIsOpen: true,
        headingIsLight: true,
        logoIsLight: true,
        footerIsLight: false
      })

    case CLOSE_NAV:
      return Object.assign({}, state, { navIsOpen: false })

    case TAKE_UI_SNAPSHOT:
      return Object.assign({}, state, { uiSnapshot: state })

    case APPLY_UI_SNAPSHOT:
      return Object.assign({}, state, state.uiSnapshot)

    default:
      return state
  }
}

export default reducer

```

So this part needs some explanation. In a Redux reducer, we handle each `action.type` with a different case. Each case is designed to return a new object with our desired state.

If you're unfamiliar with `Object.assign`, I would suggest reading up about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign). The first argument is our target, in this case, an empty object. Any following argument is deeply merged into our target. So we start by handling (virtually every) case by using `Object.assign({}, state)` and then pass another object containing just the state we want to change. In the `OPEN_NAV` case, we can see that we want to change 4 properties of our state, and thus pass an object containing those changes as the final source to our `Object.assign()` method.

Understanding how `Object.assign()` works is key to understanding how snapshots can be saved and applied. Let's say that in our store we dispatch an `OPEN_NAV` action, preceded by a `TAKE_UI_SNAPSHOT` action like so.

```javascript
import store from './store'
import { takeUISnapshot, openNav } from './actions/ui'

store.dispatch(takeUISnapshot())
store.dispatch(openNav())
```

When we take our snapshot, the `uiSnapshot` property contains our entire previous state, including its own initial state of `null`. An example snapshot would look like this:

```javascript
{
  headingIsLight: false,
  logoIsLight: false,
  footerIsLight: true,
  navIsOpen: false,
  uiSnapshot: {
    headingIsLight: false,
    logoIsLight: false,
    footerIsLight: true,
    navIsOpen: false,
    uiSnapshot: null
  }
}

```

As you can see, our state tree has been duplicated. Now when we apply the snapshot, we merge the value stored under `uiSnapshot` at the root level of our tree, which handily resets `uiSnapshot` to `null`. Thus, if a user closes the nav without choosing a link (and thus choosing a different state), we can close the nav and revert to the previous state just by applying the snapshot.

```javascript
import store from './store'
import { closeNav, applyUISnapshot } from './actions/ui'

store.dispatch(applyUISnapshot())
```

Because `navOpen: false` is stored in the snapshot, the nav closes when we apply it to state (though, I would likely dispatch `closeNav()` to be explicit. There's no harm when `Object.assign()` encounters key/value pairs that are equal).

### The Sky's the Limit

I think the uses for this technique are many and I wouldn't be surprised to find that it's already being used in lots of places. One potential use case I can think of is when an error in your application occurs, you could log out a snapshot of your _entire_ state tree and use that snapshot for debugging purposes. I could also see it being useful if you just wanted to toggle between states while developing components.

### Conclusion

Hope you find this technique useful. Please feel free to share any other use cases you can think of or any libraries already using this technique. I would love to read through the code and learn any new tricks I can from it.
