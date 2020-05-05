---
tags: ['Rails', 'Ruby']
date: '2016-07-02'
slug: 'componentize-gem'
subtitle: 'or Bringing Components to Rails Projects.'
title: 'Componentize Gem'
---

In my last few Rails projects, I have been exploring strategies to create and utilize "components" similar to how components are used in Ember. Rails doesn't have a simple, native way to do this. However, I think I've come up with a good way to accomplish this, and I have created a gem to facilitate building Rails components rapidly.

In my opinion, the best way to accomplish this in Rails is to heavily utilize view partials. View partials in Rails can be rendered in two fashions: inline and block. This gives us a lot of flexibility when composing our UI.

The key to making these partials reusable is to be able to pass data into them. A block level partial looks like this (in Slim):

```
ruby:
  heading ||= nil
  subheading ||= nil

.my_component
  header.my_component-header
    - if heading.present?
      h1.my_component-heading = heading
    - if subheading.present?
      h3.my_component-subheading = subheading
  .my_component-body
    == yield

```

At the top of our partial file is a small Ruby block used to manipulate data passed into the partial through `locals`. The "or equals" operator is a great Ruby shorthand for assigning default values to a variable. In this case, if no `heading` or `subheading` local is passed in, the variables are set to `nil`, which is a falsy value in Ruby and thus, neither the `h1` or `h3` tags would be rendered. The `== yield` on the last line allows us to use this partial in a Ruby `do block`. Thus, anything we pass inside of the `do block` will be rendered in the `yield`. This allows us to build sections and layouts that are reusable, but flexible with their inner content. An example view made of components might look like this:

```
= render 'hero_image',
  img: '/path/to/image',
  alt: 'A great image.'

= render layout: 'main_section',
  locals: { heading: 'Greatest Web Article Ever' } do
    p This is the first paragraph that will be passed into the yield of this block level component
    p This is the second. What a fine component
    = render 'author_info',
      name: 'Kyle Shevlin',
      profession: 'Web Developer'


```

At the top of the view, an inline component is rendered for a hero image, then a block level `main_section` is rendered with a couple paragraphs and an `author_info` inline component passed inside of it.

### Make the Process Faster

For each component I made, I would create two files and have to update another. I would create a Slim partial, a SCSS partial, and update our `base.scss` file to `@import` the new style partial. Any process that is done over and over again deserves to be automated, thus I wrote Componentize.

Componentize is a Ruby gem that allows you to generate Rails components from the command line similar to how Ember-CLI works. A simple command will create all the files you need, prepopulated with the data passed to the command, and add an `@import` statement to your stylesheet.

The way it works is very simple:

```
rails generate component <NAME> [options]

```

And a real, full example:

```
rails generate component my-component --block --format slim

```

Adding the `--block` flag will make the partial a block partial by adding a yield to it, and you can specify what format the view file should be. Default is `erb`, but `slim`, and `haml` are available as well.

I believe components are more than just the future of the web, they are the smartest way to build UIs. Never again will you accidentally break your UI by missing a class here or having incorrect indentation there. Reusability means getting the same markup and styles every time. Components will make you break down your UI into the best, logical pieces and help you build more quickly. I hope that Componentize can help you do that even faster.
