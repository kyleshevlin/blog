---
categories: ['JavaScript', 'Web Development']
date: '2019-01-22'
description: 'How do we create a state machine using the XState library. In this article, we will create our first state machine using XState.'
keywords: ['state machines', 'finite state automata', 'XState']
relatedPostsSlugs: ['what-are-state-machines', 'xstate-visualizer']
slug: 'our-first-xstate-machine'
tags: ['State Machines']
title: 'State Machines: Our First XState Machine'
---

In a [previous post](/what-are-state-machines), I explained what a state machine is and how to build one from scratch. In this post, we're going to learn how to make our first state machine using the [XState library](https://xstate.js.org). First step? You guessed it. Install the library into your project.

```bash
npm install --save xstate
```

Next, we're going to get the `Machine` function and the `interpret` function from the library. These functions are very similar to the ones I made in the other post, so these might seem familiar.

```javascript
import { Machine } from 'xstate'
import { interpret } from 'xstate/lib/interpreter'
```

Now, let's create an example. I'm going to use the same example that I used in an [egghead lesson I made to introduce this topic](https://egghead.io/lessons/javascript-handle-state-transitions-through-events-in-a-finite-state-machine-with-xstate), an elevator. Specifically, a single elevator box.

The box of an elevator can have three possible states: stopped, moving up, or moving down. Let's start configuring our `elevatorMachine` with these states.

```javascript
import { Machine } from 'xstate'
import { interpret } from 'xstate/lib/interpreter'

const elevatorMachine = Machine({
  states: {
    stop: {},
    up: {},
    down: {}
  }
})
```

Let's give our machine an initial state of `stop` next.

```javascript
import { Machine } from 'xstate'
import { interpret } from 'xstate/lib/interpreter'

const elevatorMachine = Machine({
  initial: 'stop',
  states: {
    stop: {},
    up: {},
    down: {}
  }
})
```

Now, we need to define the transitions for each state. For each state of our elevator machine, we can transition to the other two possible states. With XState, we define these using a state's `on` property, like so:

```javascript
import { Machine } from 'xstate'
import { interpret } from 'xstate/lib/interpreter'

const elevatorMachine = Machine({
  initial: 'stop'
  states: {
    stop: {
      on: {
        UP: 'up',
        DOWN: 'down'
      }
    },
    up: {
      on: {
        STOP: 'stop',
        DOWN: 'down'
      }
    },
    down: {
      on: {
        STOP: 'stop',
        UP: 'up'
      }
    }
  }
})
```

Now that we've enumerated our states and event transitions, we can use the `interpret` function to make our machine useful. This function will allow us to define an action to occur for each transition, as well as start the machine itself.

```javascript
import { Machine } from 'xstate'
import { interpret } from 'xstate/lib/interpreter'

// ...previous code for our machine

const elevatorService = interpret(elevatorMachine)
  .onTransition(state => {
    console.log(state.value)
  })
  .start() // 'stop'
```

Now we can use the `send` method on our `elevatorService` to send events and update the state.

```javascript
elevatorService.send('UP') // 'up'
elevatorService.send('DOWN') // 'down'
elevatorService.send('STOP') // 'stop'
```

Now, what happens if we send an event that's _not_ one of the enumerated possibilities?

```javascript
elevatorService.send('FOO') // 'stop'
```

Absolutely nothing! Which is exactly what we want to happen. Only defined events should have an effect on our machine. That being said, you might be the sort of person who wants to throw up a red flag, so to speak, when something like this might occur. In that case, XState machines can be put into _strict mode_. In strict mode, a machine will throw an error when a non-enumerated event is sent.

```javascript
const elevatorMachine = Machine({
  strict: true
  // ...the rest of the machine configuration from before
})

// ...and all the interpreter code from before as well
elevatorService.send('FOO')
// Error: Machine '(machine)' does not accept event 'FOO'
```

Whoops! XState didn't like that. An error was thrown indicating an unaccounted event was attempted, but the error message leaves something wanting. Wouldn't it be nice to be able to identify _what machine_ broke in the message? This is where giving a state machine an `id` can be really handy.

```javascript
const elevatorMachine = Machine({
  id: 'elevator-1'
  // ... the rest of the machine configuration from before
})

// ...and all the interpreter code from before as well
elevatorService.send('FOO')
// Error: Machine 'elevator-1' does not accept event 'FOO'
```

And with that, we've finished making our first state machine with XState. I hope that you find this helpful as you get started using the library. I'll cover all the important parts with more depth soon.

If you'd like to see some of this code in action, you can check out this quick CodeSandbox I made below. Using only plain JavaScript, I added some buttons and a little "elevator" that the state machine controls. Try it out. I recommend hitting the "DOWN" button first, the elevator _will_ go through the roof if you don't!

<iframe src="https://codesandbox.io/embed/88nyv28ry0" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
