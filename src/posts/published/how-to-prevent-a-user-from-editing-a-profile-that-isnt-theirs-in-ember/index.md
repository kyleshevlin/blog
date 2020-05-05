---
tags: ['Ember']
date: '2016-06-18'
slug: 'how-to-prevent-a-user-from-editing-a-profile-that-isnt-theirs-in-ember'
subtitle: 'or How to Keep Mischievous Users Out of the Cookie Jar'
title: "How to Prevent a User from Editing a Profile That Isn't Theirs in Ember"
---

I was working on Tempo the other night and ran into a pretty common situation I wasn't sure how to solve right away. I had created profile pages for my users and given them the option to edit their profile. However, I needed to make sure that a user couldn't edit a profile that _wasn't_ theirs.

While hiding links to the edit pages of other users was simple enough, I wasn't sure how to prevent a clever user from accessing an edit page that wasn't theirs by appending `/edit` to a profile URL. After reading up on the life cycle of an Ember route, I came across a method that I could utilize to solve my problem.

Each Ember Route goes through a series of hooks as it prepares to render. I found this [GitHub gist](https://gist.github.com/Andrew-Max/305483febc3c367dbf57) outlining the order of these hooks with a short description of their function. For my purposes, the `afterModel` hook would work great.

The `afterModel` method runs _obviously_ after the `model` method Promise has returned. It takes two arguments, the `resolvedModel` and the `transition` object. Thus, I can compare the `resolvedModel` to my `currentUser` stored in the session, and if they aren't the same user, I abort the transition and boot them back to a different page. It all looks a bit like this:

```javascript
// routes/profile/edit.js
import Ember from 'ember'
import AuthenticatedRoute from '../../mixins/authenticated-route'

const { service } = Ember.inject

export default Ember.Route.extend(AuthenticatedRoute, {
  session: service(),

  model(params) {
    return this.store.findRecord('user', params.user_id)
  },

  afterModel(model, transition) {
    if (model.id !== this.get('session.currentUser.id')) {
      transition.abort()
      this.transitionTo('profile.index', model.id)
    }
  }
})
```

By comparing the stored ids, we can check if the user is allowed to the edit page. If not, we silently slap them on the wrist and send them back to the profile page.
