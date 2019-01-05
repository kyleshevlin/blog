---
date: "2016-01-30"
slug: "shevy"
status: "publish"
title: "Shevy"
squareImage: "./images/shevy_square.jpg"
---

Shevy is a tool for developers who want perfect vertical rhythm in their typography without giving it much thought.

We don't often think about it, but we've been taught vertical rhythm almost our entire lives. When we began learning how to write, we did so on lined paper. Those beautiful sky blue lines were there not only as a guide for your letters, but as a guide for the spacing of your lines. This spacing is called vertical rhythm.

Now, getting a solid vertical rhythm in CSS can be difficult for two reasons: 1) we can define our own line-height per typographical element, and 2) CSS applies line-height above and below our font, which is similar to floating your letters between the blue lines on a piece of paper, rather than resting them on the lines.

So, to overcome this, we mathematics to calculate all the right distances that need to be set.

Shevy takes a Sass map of settings and spits out all the necessary typography from that. Let's look at the default settings:

```scss
$shevy: (
    base-font-size: 1em,
    base-line-height: 1.5,
    base-font-scale: (3, 2.5, 2, 1.5, 1.25, 1),
    paragraph-scale: false,
    margin-bottom: true
);
```

In this configuration map, we are defining a base font-size, line-height and font-scale to determine our sizes and rhythm. The paragraph scale setting can be used to override the last value defined in the font-scale (which is applied as the paragraph font-size) and margin-bottoms can be omitted from `h1-h6` headings.

Using the values above, Shevy calculates and outputs your `h1` through `h6` values with the call of just one mixin: `@include headings;`. That resulting code looks like this:

```css
h1 {
  font-size: 3em;
  line-height: 1;
  margin-bottom: 0.5em;
}

h2 {
  font-size: 2.5em;
  line-height: 1.2;
  margin-bottom: 0.6em;
}

h3 {
  font-size: 2em;
  line-height: 1.5;
  margin-bottom: 0.75em;
}

h4 {
  font-size: 1.5em;
  line-height: 1;
  margin-bottom: 1em;
}

h5 {
  font-size: 1.25em;
  line-height: 1.2;
  margin-bottom: 1.2em;
}

h6 {
  font-size: 1em;
  line-height: 1.5;
  margin-bottom: 1.5em;
}

p {
  font-size: 1em;
  line-height: 1.5em;
  margin-bottom: 1.5em;
}
```

You can add Shevy to your next project or checkout the source code by going to the [repo](https://github.com/kyleshevlin/shevy). You can also see a demo at [kyleshevlin.github.io/shevy](https://kyleshevlin.github.io/shevy).
