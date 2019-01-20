---
date: '2016-01-30'
link: 'https://github.com/kyleshevlin/ripsum'
slug: 'ripsum'
status: 'archived'
title: 'Ripsum'
squareImage: './images/ripsum_square.jpg'
---

Ripsum was born out of a personal conviction I hold regarding web design: you must plan ahead for the worst case scenarios.

I'll admit, the designers I work with are capable of creating some of the most beautiful and elegant designs I've ever seen. But when you're preparing deliverables for a client, you're probably not inclined to purposely put worst case scenarios (WCSs) in your handoff. This leads to style situations that weren't considered until some of the real data provided by the client breaks it. Thus, Ripsum.

Ripsum is a small Ruby gem that will randomly generate a number of words based on a standard count and a variance. The view helper method looks like this:

```ruby
<%= ripsum(100, 0.5) %>
```

This short method will give you a string of lorem ipsum text between 50 and 150 words long. How does it do this? Simple.

The first argument is the standard word count. In fact, if you don't provide the second argument, Ripsum will give you this standard count every time (but the words will randomize with each page load). In this case, that is 100 words.

The second argument is our variance. We use this to determine the minimum and maximum number of words Ripsum will provide. In this case, the minimum is 50 (100 - (100 \* 0.5)) and the maximum is 150 (100 + (100 \* 0.5)). Ripsum then randomly chooses a number between these two values and supplies that many words to the page.

This randomization of text helps stress test a design and reveals cracks and pain points right away.

A custom library of words can be supplied to Ripsum in a configuration file, so instead of Lorem Ipsum, you can have Hipster Ipsum, Hogwarts Ipsum, or whatever ipsum you might prefer.

You can add Ripsum to your next Ruby on Rails project with this:

```ruby
gem 'ripsum'
```

You can check out the [Github repo](https://github.com/kyleshevlin/ripsum) or a [demo of it in action](https://kyleshevlin.github.io/ripsum).
