---
categories: ['JavaScript', 'Web Development']
tags: ['React']
date: '2016-12-01'
slug: 'how-to-use-client-side-libraries-in-a-universal-javascript-app'
status: 'publish'
title: 'How To Use Client Side Libraries in a Universal JavaScript App'
---

At work, I am building a JavaScript application with universal rendering. There are a number of challenges with building a universally rendered application, but one challenge in particular is making sure code that should only run on the client doesn't cause the server to crash.

Today, I built a React component that used the [imagesloaded](http://imagesloaded.desandro.com/) library to detect if any images nested in the component were loaded. This is very useful for downloading large images. You can set the opacity of the image to 0 until it loads, and then transition to a visible state.

Sadly, this is not as simple as importing the library and treating it like any other application. The reason: the `window` object doesn't exist in a Node environment. Thus, any code that requires the `window` object will fail, and often fail loudly (which are, of course, the best errors, pesky as they may be).

There are a number of possible solutions to this problem. Some involve setting a fake `global.window` object in your Node server. Another solution might be to use [jsdom](https://github.com/tmpvar/jsdom) but I think that could be overkill. What we need is a solution that allows the code to harmlessly fail when it runs on the server, and then run as it should on the client. Here's the trick.

```javascript
const isBrowser = typeof window !== 'undefined'
const imagesLoaded = isBrowser ? require('imagesloaded') : () => {}
```

It's really that simple. First we create a check for whether this code is being run on the client or on the server. If it's on the client, we require the library using CommonJS (not ES6 imports) and it runs as it should. If the code is being run on the server, we return an empty function that is perfectly harmless when called. It's a simple little trick to keeping your code from crashing your server.

### Next Steps

I have not tested this out, but if you're trying to use methods from a client side library on the server and throwing errors, I believe you could add methods to an otherwise empty object. Make sure these methods are just empty functions, thus continuing the trend of harmless server side failure. And remember, it's not really failure. This code wouldn't do anything in that environment anyways.

In Webpack 2, I would take this code a step further and split it so it's not even requested until it is needed on the client, and thus present another potential solution to this problem.

Best of luck with this trick and building your own universal application. Let me know if you think of any hiccups that this technique might raise, or any other clever tricks you have up your sleeve for this scenario.
