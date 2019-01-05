---
categories: ['Web Development']
date: "2015-08-08"
slug: "how-to-set-the-order-of-media-queries-for-sprockets-media-query-combiner"
status: "publish"
title: "How to Set the Order of Media Queries for Sprockets Media Query Combiner"
---

Today I was working on a project that's about to launch in a few weeks. I was asked to make a last-minute change to the layout of a page (of course!), which required me to use a media query size I had not yet used in the project. At FINE, we've established the standard of using a breakpoint mixin nested inside our selector to handle responsive behavior. Our pattern, in short, looks like this:

```
.block {
  width: 100px;

  @include bp(small) {
    width: 200px;
  }

  @include bp(medium) {
    width: 300px;
  }
}

```

This is generally never a problem. The bugs show up when you combine this style of coding with a media query combiner. We are a Ruby on Rails dev shop, so we have been using the gem Sprockets Media Query Combiner for some time. It reads our CSS/SCSS and combines the media query output into single media query blocks. If I use the `bp()` mixin 50 times, it takes those 50 declarations and moves them into one media query block. This is great for reducing the size of your CSS files after compilation.

However, SMQC utilizes a first-come, first-serve strategy when creating these combined media queries. In the example above, you can see that I am working with a mobile-first strategy that changes CSS as our viewport gets bigger. Thus, we order our media queries from smallest to largest screen size. This would be fine if this was the only declaration in our code base. But that's not practical. If the queries in my example were in a different order (or as was the case in my project, another selector had a `bp(medium)` mixin before my `small` one was declared) then our output would compile the medium query first, and the small query second. What would happen in the browser is the CSS further down the file would have precedence over the CSS further up the file. Our small styles would override our medium styles. Chaos and pandemonium would ensue. So, how can we get SMQC to put our queries in the order we want without adding to the compiled CSS.

Easy. We trick it.

Since SMQC determines order based on what query it finds first, we simply need to declare our media queries in the right order at the start of our project. Here's the great part, we can do this without adding code. We just need a CSS comment (a Sass comment won't work since it won't compile to anything). Putting a CSS comment in a media query is enough to trigger SMQC to grab that media query and start combining. Thus, we can make a partial of empty breakpoint mixins in our desired order of output. SMQC reads these fake queries and orders the real ones to match.

I accomplished this by creating a new file, `_query_order.scss`. This is an example of the code you would find in there:

```
@include bp(small) { /**/ }
@include bp(medium) { /**/ }
@include bp(large) { /**/ }
@include bp(gargantuan) { /**/ }

```

Once the file was made, I made sure to import it before the breakpoint mixin was used any where else. In my case, I imported this query order file before my global element styles. Perhaps there is a more logical place for you to place this file in your own project.

Hope this helps you solve a nagging problem of keeping your media queries in the right order on your next Ruby on Rails project (or other Ruby build).
