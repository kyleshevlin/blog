---
date: '2015-12-06'
slug: 'ripsum-random-lorem-ipsum'
subtitle: 'A Ruby Gem for Generating a Random Amount of Lorem Ipsum with Each Page Load'
title: 'Ripsum'
---

Today, I published my first Ruby gem: [Ripsum](https://rubygems.org/gems/ripsum). Using Ripsum allows you to generate a random amount of lorem ipsum text with each page load. But why might we want to randomize how much text is output to a page?

I work with designers who frequently miss what might happen to a layout if a heading is too long or too short, or if a body of text is not the exact number of lines they were expecting. I personally think this is a flawed design philosophy, that worst case scenarios should be considered alongside best case scenarios and that design should not dictate content, but vice versa. While I can do little to alter others' design philosophies, I can help them find edge cases faster by stress testing their designs during our template building phase.

Utilizing Ripsum, I can pick a standard number of words and choose an amount of variance and see what may or may not happen when we deviate from the expected word count.

Let's examine how this works. Ripsum is used like so:

```ruby
<%= ripsum(100, 0.5) %>

```

The `ripsum` method takes two arguments, the standard and the variance. We multiply the variance by the standard, create min and max word counts by subtracting from and adding to the standard, then randomly choose a number between the min and max values and out put that many words of text. In the example above, our minimum word count is 50, our maximum word count is 150. We can increase or decrease the variation by increasing or decreasing the variance. The code for accomplishing this task looks similar to this:

```ruby
def ripsum(standard, variance)
  min = standard - (standard * variance)
  max = standard + (standard * variance)
  count = rand(min..max)
  # Then process a library of words to output a "counts" worth of them
end

```

### The Future of Ripsum

There are a number of features I would like to add to Ripsum, some in the immediate future, some further on. Right now, Ripsum only does word count, but I'd like to add the option of doing character count in the near future, and potentially paragraph count further on.

I'd also like to enable the end user to supply their own library of words instead of the default lorem ipsum text. There are so many ipsums out there I'd hate to prevent someone from using their favorite.

Last but not least, I'd like to add some tests to the gem so that it's a bit more robust and bulletproof in the future.

### Collaboration

If you are interested in contributing to the project, find it on [Github](https://github.com/kyleshevlin/ripsum) and get started. Would love to see what we can turn this into.
