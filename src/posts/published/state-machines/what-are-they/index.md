---
date: '2019-01-21'
description: 'What is a state machine? A state machine is a way to represent all the enumerated possible states and events of a given system. In this article, we will create a rudimentary state machine and interpreter in JavaScript.'
keywords: ['state machines', 'finite state automata']
relatedPostsSlugs: ['our-first-xstate-machine', 'xstate-visualizer']
slug: 'what-are-state-machines'
tags: ['State Machines']
title: 'State Machines: What Are They?'
---

Defining and managing state in software is a difficult challenge. Even simple systems can often be more complicated than they first seem. State machines provide a reliable interface for handling these systems and are capable of handling problems from the simple to the highly complex.

A state machine, more specifically a _finite_ state machine, is an API that enumerates all the possible (and thus finite) states of a system. For each of these states, a set of `events` is enumerated which defines the possible transitions between states. A state machine can _only_ ever be in a single state at a time and is only transitioned to a new state by an event.

By defining all the finite possibilities of our machine's states and events, we create a graph data structure describing our system. Each node represents a state, each edge a possible event from that state. There are a lot of cool things we can do with state machines because of this (like auto-generating visualizations of our system) that will be covered in future blog posts.

### A Simple Example

Let's consider a very simple example, a light switch. A light switch has two finite states, an `on` state and an `off` state. Let's write a rudimentary form of a state machine representing a light switch in JavaScript as we go. You can follow along in an online editor such as [CodeSandbox](https://codesandbox.io/s/vanilla) or [JSBin](https://jsbin.com/?js,console) if you'd like. I'm going to use whatever data structure comes naturally to me and make changes as necessary. Since we're listing out states, let's start with an array.

```javascript
const lightSwitch = {
  states: ['on', 'off']
}
```

A state machine also requires an initial state, so let's add that as well. We'll set our switch to `'off'`. We should be energy conscious with our example, of course.

```javascript
const lightSwitch = {
  initial: 'off',
  states: ['on', 'off']
}
```

Now, for each of these states, we need to define possible `events`. That is, when a transition is attempted with a given event, what state should we derive next depending on the event? In the case of a light switch, there really is only one event, `SWITCH`. This `SWITCH` event transitions our machine to the opposite state.

Since these events correspond with each state, an array no longer serves our purposes well, so we will use an object instead. Each key in the first level of our `states` object will correspond with a possible state of our machine. Each state will then have an `events` object enumerating the possible events for that state. Each key in the `events` object will be the name of our event, in this case `SWITCH`, and the corresponding value will be the name of the next state.

```javascript
const lightSwitch = {
  initial: 'off',
  states: {
    on: {
      events: {
        SWITCH: 'off'
      }
    },
    off: {
      events: {
        SWITCH: 'on'
      }
    }
  }
}
```

Now that we've enumerated the possibilities of our light switch, we need a function that can take a machine, interpret it, and give us back the correct state. Thus, let's implement a state machine `interpreter`.

Our `interpreter` will take a `machine` as an argument, and expose a set of methods that can be used to get the current state of the machine or attempt a transition on the machine.

```javascript
const interpreter = machine => {
  // We store the current state in closure
  // keeping the value in memory
  let currentState = machine.initial

  return {
    currentState() {
      return currentState
    },
    transition(event) {
      // Since we enumerated all possible events
      // for each state, our next state is either
      // the defined state for that event,
      // or it is undefined, and thus we can
      // return the currentState
      const nextState =
        machine.states[currentState].events[event] || currentState
      currentState = nextState
      return nextState
    }
  }
}
```

Now we can use the `interpreter` on our `lightSwitch` machine and see it in action.

```javascript
// ...code from before
const mySwitch = interpreter(lightSwitch)

// Try the current state
console.log(mySwitch.currentState()) // 'off'

// Try a defined transition
console.log(mySwitch.transition('SWITCH')) // 'on'

// Try an undefined transition
console.log(mySwitch.transition('FOO')) // 'on'
```

As you can see, our rudimentary machine and interpreter creates a pretty solid interface for managing the state of the light switch. Our light switch can never get into a "bad state", and it's completely inert to events that we have not defined. This should give us a lot of confidence in our application.

We can easily add methods and properties to this interface to enhance its functionality, too. For example, we could add a method to the `interpreter` to return all the possible events for a given state.

```javascript
// ...inside the object returned from `interpreter`
allEvents() {
  const { events = {} } = machine.states[currentState]
  return Object.keys(events)
}

// ...further down
console.log(mySwitch.allEvents()) // ['SWITCH']
```

There are a lot more possibilities to enhance this rudimentary state machine, but I'd rather focus on a _real_ state machine library in future blog posts. As I continue to write and explore this topic, I'll start using the [XState library](https://xstate.js.org) by [David Khourshid](https://twitter.com/davidkpiano). I encourage you to check it out and read up on it in the meantime. [David's talk at React Rally](https://www.youtube.com/watch?v=VU1NKX6Qkxc) is what initially inspired my interest in state machines and is something you should definitely watch. Alright, see you in the next blog post!

```javascript
// Let's not leave the light on
console.log(mySwitch.transition('SWITCH')) // 'off'
```
