---
categories: ['JavaScript', 'Web Development']
tags: ['Ember', 'Rails']
date: "2016-06-11"
slug: "jsonapi-is-not-json"
subtitle: "or How MIME types can bite you in the ass"
title: "JSONAPI is not JSON"
---

I've been putting in a few hours each day this week on my new project: [Tempo](http://kyleshevlin.com/new-project-codename-tempo/). I've spent most of that time running into snags, but in the process have learned a lot of things.

At the crux of my application are users, so it seemed like the right place to start. I've been trying to create a user login and signup process by connecting Rails' [Devise gem](https://github.com/plataformatec/devise) with Ember's [Ember Simple Auth addon](https://github.com/simplabs/ember-simple-auth). I've gotten this working in the past and thought it would be a relatively straight forward process. However, it took me quite some time to understand that Devise is not prepared to handle Ember's new JSONAPIAdapter.

Devise balks at JSONAPI because it (I should say Rails, actually) doesn't recognize it as the same MIME type as JSON. Rails/Devise aren't wrong. The "Content-Type" sent in the headers is not "application/json", it's "application/vnd.api+json". Once I figured this out, I set off on trying to get Devise to respond to JSONAPI properly.

I came upon this [excellent blog post](http://blog.arkency.com/2016/03/creating-new-content-types-in-rails-4-dot-2/) that showed me how register a custom MIME type and how to force its content into being parsed as JSON. This got me past the 406 UnknownFormat error I was getting from the server, but now I was getting a 500 No Renderer error.

Luckily, I stumbled upon this [Github Issue](https://github.com/apotonick/roar-rails/issues/65) that showed me a strategy for rendering the data as JSON.

However, after all that, I still didn't get this working. Sure Devise/Rails are now technically and correctly responding to JSONAPI, but Devise is struggling to turn the JSONAPI data sent to it into a hash it can work with.

At this point, I think it might behoove me to roll my own authentication and registration process. I know doing so will teach me a lot about understanding how authentication works. It's either this, or hand-massage the data in a multitude of Devise controller methods. This leaves me in the coding equivalent of stuck between a rock and a hard place.
