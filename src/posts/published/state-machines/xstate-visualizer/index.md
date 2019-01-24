---
categories: ['JavaScript', 'Web Development']
date: '2019-01-24'
description: 'Sometimes seeing is understanding. XState provides a visualizer tool that allows us to see our state machine as a graphical interface, and not just code.'
keywords: ['state machines', 'finite state automata', 'XState']
relatedPostsSlugs: ['our-first-xstate-machine', 'what-are-state-machines']
slug: 'xstate-visualizer'
tags: ['State Machines']
title: 'State Machines: The XState Visualizer'
---

I made mention in my ["What Are State Machines?" post](/what-are-state-machines) of the fact that a state machine is a graph data structure. Each state a node. Each transition an edge triggered by an event. You remember, right? No worries if you don't, now you know.

I also mentioned you can do cool things like create a graphical representation of your state machine _because_ of this data structure. Well, I have good news. XState has a [state machine visualizer tool](https://statecharts.github.io/xstate-viz/).

The XState Visualizer allows you to _see_ your state machine in action, which might be really handy for those of you who grok things visually. Let's take a look at it.

Open up the XState Visualizer in another tab with this link: [https://statecharts.github.io/xstate-viz/](https://statecharts.github.io/xstate-viz/). You'll see an example of a stop light in the visualizer by default. On the left, is the graphical representation, and on the right is the code to produce that representation.

![](/images/xstate_visualizer_init.png)

On the left, each "box" represents one of our states. The initial state is indicated by the "dot and arrow" you see pointing to the "green" state. The highlighted state (indicated by the blue color), is the state the machine is currently in. The buttons inside each box will trigger the event with that name, and move it into the state it points to with the arrow. Give it a try.

Clicking the "TIMER" button will move the state to "yellow". Notice that the state and buttons that are not enabled become gray. You can continue to click event buttons to move the state along.

Another way to trigger events in the visualizer is manually in the "State" tab in the panel on the right. Click into the State tab, and you should see several items: Value, Context, Actions. At the bottom of the tab is an area for Events, where you can write your own and trigger them with the "Send Event" button. Since the light machine only has one event, try sending the `TIMER` event and watch the state update.

![](/images/state_tab_open.png)

Just like clicking the event buttons inside our state boxes, sending events manually also updates the state. I'll discuss the extra parts of this tab, **context** and **actions**, soon.

Now that you know the basics of using the visualizer, try it out and get a feel for it. If you don't know where to start, why not start by copy/pasting the code from the elevator example in my ["Our First XState Machine" post](/our-first-xstate-machine). Update the elevator as you go. Can you figure out a way to add an `open` and `closed` state to the elevator doors? Better yet, figure out how restrict the elevator to only moving up and down while the doors are closed. Send me your answers on Twitter when you do!
