---
categories: ['JavaScript', 'Web Development']
date: '2019-01-27'
description: 'Kyle Shevlin breaks down the steps it took to get Firebase, Gatsby, and Netlify to work for the new "beard stroke" post-liking feature of his blog'
keywords:
  [
    'Gatsby',
    'Firebase',
    'Netlify',
    'dynamic imports',
    'singleton',
    'environment variables',
  ]
relatedPostsSlugs: ['why-i-rewrote-my-blog-with-gatsby', 'how-to-add-algolia-search-to-a-gatsby-site']
subtitle: 'or How I Fixed an Unexpected Snafu'
slug: 'firebase-and-gatsby-together-at-last'
tags: ['Firebase', 'Gatsby', 'React']
title: 'Firebase and Gatsby, Together At Last'
---

If you look just above the title of this post, you should see a beard icon and the phrase `${strokes} bestowed`. It's a fun little indicator of how many likes this post has received to date. I built this using a [Firebase Realtime Database](https://firebase.google.com/). For those of you unfamiliar with Firebase, it's a cool, JSON-based DBaaS (database-as-a-service) product from Google that I've used in a few other projects.

Firebase comes with a JavaScript SDK that's normally a cinch to hook up to a client side code. In fact, I had zero complications with combining [Gatsby](https://www.gatsbyjs.org/) and Firebase until I tried to deploy my new feature. That's when things started hitting the fan.

### A Missing `Window`

The first issue I ran into was when I tried to run a build. Gatsby ran into some issues with Firebase. I was really confused at first because Firebase was working just fine in Gatsby's development environment. I wasn't expecting it to crash and burn so badly when it was built.

Turns out that Firebase's initialization code makes a reference to the `window` object. This isn't a problem in development, because we're using Webpack's dev server. But running `gatsby build` is a bit different. `window` does not exist in the build environment and you have to be careful where and when you try to access the object. Firebase was crashing every build because it was trying to access a property on this non-existent object.

Ok, how do we solve this?

After going down a few wrong paths (and reading some Github issues), I landed on a solution I'm pretty happy with. I ended up changing how, more precisely _when_, Firebase was initialized in the application. At first, I followed a tried and true method for initializing the app that looks like this:

```javascript
import firebase from 'firebase/app'
import 'firebase/database'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

firebase.initializeApp(config)

export default firebase

export const database = firebase.database()
```

With this strategy, I have a file, `firebase.js`, that initializes the app right away and exports the initialized `firebase` instance around the application. More importantly, it exports my `database` around the application to be used in whatever components need to hook up to it.

The problem with this strategy, as mentioned before, is that the `window` object is not available to the `initializeApp` method during the build process (not to mention, those environment variables aren't correct either, but I'll address that later in the post).

To solve this, I need Firebase to delay initializing until we're in the client side environment. But, I still want to have a single instance in the app and a way to export the database. This calls for a refactor that makes use of **dynamic imports** and a **singleton pattern**.

Let's make it happen.

### Simple Functions to the Rescue

Often, I often find a simple function ends up being the best solution to a problem. First, I started by changing the code in `firebase.js` to look like this:

```javascript
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

let firebaseInstance
export const getFirebase = firebase => {
  if (firebaseInstance) {
    return firebaseInstance
  }

  firebase.initializeApp(config)
  firebaseInstance = firebase

  return firebase
}
```

We don't import any of the `firebase` packages into the module. Instead, we export a function that receives the `firebase` package as an argument. Inside this function, we check that an instance of `firebase` does not previously exist (held in closure by the module). If it does exist, return the initialized instance, otherwise proceed with initializing `firebase` and return it. This is the singleton pattern I mentioned before.

Now, in the components that need `firebase`, I can wait until the `componentDidMount` lifecycle method has been called, which guarantees that the `window` object exists. Once I can make this guarantee, I can then _dynamically import_ the `firebase` modules I need and pass them into my function. The `firebase` instance is returned from the function, which I can then get the database from. That code looks like this:

```javascript
componentDidMount() {
  const lazyApp = import('firebase/app')
  const lazyDatabase = import('firebase/database')

  Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
    const database = getFirebase(firebase).database()
    // do something with `database` here,
    // or store it as an instance variable or in state
    // to do stuff with it later
  })
}

// I might update this with hooks once they're released officially.
// You'll have to come back and find out.
```

With this code in place, I can make reads and writes to the Firebase database from a component. I _thought_ this would be the end of my problems. I was wrong.

### Gatsby, Netlify, and Environment Variables

Now, before I go into this I want to make it clear, I read the documentation for all of these things: Gatsby's environment variables, Netlify's environment variables. I thought I had it all set up correctly. I did not. I ended up reading (and reading) the docs a few more times before I finally understood what I needed to do.

For those of you who might not be familiar with **environment variables**, let me give you a brief explanation. As the name suggests, these are variables that are exposed to a particular environment, such as `development`, `test`, or `production`. For example, you might want to have an `API_ENDPOINT` variable in your code that is different depending on whether you're in `development` or `production`. Thus, you inject these different values into the environment when it is instantiated, and they're made available to your code via the `process.env` object.

Environment variables are a great way to keep private code private (yes, I know it's not perfect, but bear with me. You can read up about the challenges of environment variables elsewhere). Gatsby and Netlify both have a way to inject these variables into your build. But there's a bit of a catch with Gatsby.

Gatsby makes a distinction between two kinds of environment variables. They call them "Project env vars" and "OS env vars". In my original implementation, I did not prefix my env vars with `GATSBY_`, thinking I understood how these variables worked. My code was working locally, my environment variables were correctly injected and Firebase was initializing, but I soon realized that none of my variables were getting injected properly in the production build.

I was baffled, I had also set up my variables correctly with Netlify. I double and triple checked them. Then, I read the docs again and realized that Gatsby will only make available "OS env vars" to Netlify's build. Thus I needed to prefix all my env vars in my project, in my local `.env.*` files, and on Netlify with `GATSBY_`. As soon as I did that, the build passed and my blog was back to working.

```javascript
// adding `GATSBY_` made it all better
const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID
}
```

### Conclusion

Gatsby and Firebase will work great together, but you'll have to ensure that Firebase isn't initialized until the `window` object is available. And double check your environment variables setup if you're struggling to get them defined during Netlify's build of your app.

Best of luck if you run into similar problems. Let me know what you think of my solution on Twitter!
