---

tags: ['Ember', 'React']
date: '2017-09-07'
slug: 'not-all-just-javascript-is-the-same'
title: "Not All 'Just JavaScript' is the Same"
---

I'm going to start this post with what will appear to be a tangent. I assure you, it's not.

My wife, wonderful as she is, is _not_ a very technical person. She is very caring, though, and will often listen to me talk about the technical things I am working on. This often means I need to use metaphors and similes to get my point across. I want to take a recent one I shared with her and share it with you.

Imagine two similar, but slightly different, worlds that both required you to use two languages to communicate. In both of these worlds, one of the two languages is your common tongue, your _lengua franca_. You know it very well. Have studied it for years. You'll never forget it. Sure, this language can seem, at times, primitive and without polish, but you know how to use it well, be expressive with it.

In both of these worlds, the second language, while based, in part, on the other language, is much more foreign to you. You haven't used it as long. Fewer people speak it conversationally, it's specialized and, to an outsider, might even sound like gibberish.

Now, in both worlds, in order to start any conversation, you _must_ use the second, more specific language _before_ you can use the first language. In these worlds, the first language lacks almost all context for understanding with out the second language. There is one catch, though, one major difference between these two worlds. In one world, only **one word** from the more difficult language is needed to start your conversations. In the other, you might need to use **hundreds**.

### What On Earth Are You Talking About, Kyle?

I'm talking about APIs and JavaScript obviously! If you think about it, every API is built upon a language you know. Some of these APIs are wonderful and allow you to express things easily without repeating yourself often. Some APIs aren't so great. Maybe they don't have the greatest architecture, or maybe it has some quirks and oddities that are difficult to grasp. Maybe they are so big as to be difficult to learn thoroughly. Maybe there's no documentation. I think we can all appreciate that one.

APIs are the second language in the metaphor. By starting a dialogue, or rather a program or algorithm with them, we gain access to whatever methods have been expressed within the API. Once we are in the domain of these methods, we often can revert back to our native tongue, but not always.

### The Two Worlds

Currently, I have myself in two worlds at the same time. For my day job, I work with Ember, and for all my side projects and talks, I work with React. To me, React is the first world. I only have to use a few words and some idioms from the language to get it to work. Ember, on the other hand, is the second world, where there are hundreds of words you need to know.

### The First World

With React, the only word you _must_ know is "Component". If you're using ES6 classes and JSX, then the `React.Component` method is the only "word" you need to know to get started. Sure, there are idioms like `props`, `setState`, and `componentDidMount`, but the overall technical, specific language is quite small. Aside from that, you exclusively use "Just JavaScript", that is you use the primitives and data structures given to you by the language, _not the React API_.

### The Second World

With Ember, there are many words to know. For starters, there are 40+ classes off the `Ember` module (according to the docs). There are methods upon methods to learn. Many having the same name as native data structures. Do I need `Ember.Array` or `Array`? When I use `Function` which `Function` am I getting? If an `Ember.Object` is an `Object`, why do I need special getters and setters to get properties (two-way data binding, of course, I'm being rhetorical). Some of these methods are _really_ important to the overall ecosystem, like `computed`. And `computed` isn't enough to know, as there are methods on that method, such as `alias` and `reads`.

While Ember is written in "Just JavaScript," you spend a lot less time writing native JavaScript than in React. You end up writing a lot of `Ember` (literally, you have to write `Ember` a lot).

### Which Is Why...

...I contend that not all "Just JavaScript" is the same, and _this_ is specifically what I think people mean when they claim that React is "Just JavaScript™" (see what I did there?). Sure, with Ember (and other similar JS frameworks) you're writing _with_ JavaScript, but you're spending more of your time using the API than using the language.

I think this is why React devs speak with such passion about the library and why they feel so productive. Once you get started, you virtually never need to consult the documentation again because there are significantly fewer "words" to know. There are also fewer quirks to know (setState is async, that's really the biggest one). You want to try something crazy? Just go for it with the language you already know. It's how we've gotten great patterns like HOCs and render callbacks.

With Ember, I find myself trying to do things with JavaScript, only to learn that what I really need is an Ember method. Ember has worked so hard to give me a "right way" to do things, but sometimes it feels like the "right way" is really difficult to discover. I'd rather be given the freedom to express the task at hand using the language I know best.

### Conclusion

I'm not here just to bash on Ember. Ember was my first introduction to JavaScript frameworks and I'll always feel some positive sentiment towards the project. People have built some amazing things in Ember. I'm hoping my team and I can build a great thing with Ember. But I feel like we, the JavaScript community, is really learning that less is more.

Less API. More "Just JavaScript".
