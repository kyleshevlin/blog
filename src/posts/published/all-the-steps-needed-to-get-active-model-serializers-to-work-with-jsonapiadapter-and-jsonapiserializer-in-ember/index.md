---
categories: ['JavaScript', 'Web Development']
tags: ['Ember', 'Rails']
date: '2016-06-14'
slug: 'all-the-steps-needed-to-get-active-model-serializers-to-work-with-jsonapiadapter-and-jsonapiserializer-in-ember'
subtitle: 'or the Headache That I Thought Would Never Go Away'
title: 'All the Steps Needed To Get Active Model Serializers to Work with JSONAPIAdapter and JSONAPISerializer in Ember'
---

Recently, I've been working every day on my project "Tempo", but it's been very slow with a lot of headaches. This always happens the first time or two you put the theory to practice and you run into all the tiny hurdles and obstacles you weren't expecting.

One of the major hurdles was getting rails-api's active_model_serializers gem to play nicely with Ember's default adapter and serializer based on the JSONAPI spec.

After many hours, the cobbling together the info on a dozen or so blogs, and some help from the Ember slack community, I finally pieced it all together and got it working. I'm just going to leave the code here, and when I'm more rested and less grumpy, I'll update this post to go in more detail.

Here is the Ruby code you need in your Rails api:

```
# Gemfile
gem 'active_model_serializers', '~> 0.10.0'

```

You need to create an initializer to adjust configurations for AMS. After setting the adapter to `:json_api`, this should have worked out of the box as the default `key_transform` is `:dash`, just as the JSONAPI spec suggests. However, this wasn't working for me. My payloads _to_ the server were not getting serialized from dashes to underscores, so the simplest solution was just to leave them unaltered and tell Ember to underscore its payloads. TL;DR; Rails has underscores naturally, we force underscores upon Ember.

```
# config/initializers/active_model_serializers.rb
require 'active_model_serializers/register_jsonapi_renderer'

ActiveModelSerializers.config.adapter = :json_api
ActiveModelSerializers.config.key_transform = :unaltered

```

This is part of my `users_controller.rb`; This is how you handle deserializing params, similar to handling `strong_params` in a Rails 4 app:

```
# app/controllers/users_controller.rb
def user_params
  ActiveModelSerializers::Deserialization.jsonapi_parse(params, only: [:first_name, :last_name, :email, :password, :password_confirmation])
end

```

And then the adjustments in the Ember application:

```
// app/adapters/application.js
import Ember from 'ember';
import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({
  // allows the multiword paths in urls to be underscored
  pathForType: function(type) {
    let underscored = Ember.String.underscore(type);
    return Ember.String.pluralize(underscored);
  },

  // allows queries to be sent along with a findRecord
  // hopefully Ember / EmberData will soon have this built in
  // ember-data issue tracked here:
  // https://github.com/emberjs/data/issues/3596
  urlForFindRecord(id, modelName, snapshot) {
    let url = this._super(...arguments);
    let query = Ember.get(snapshot, 'adapterOptions.query');
    if(query) {
      url += '?' + Ember.$.param(query);
    }
    return url;
  }
});

```

```
// app/serializers/application.js
import Ember from 'ember';
import JSONAPISerializer from 'ember-data/serializers/json-api';

const { underscore } = Ember.String;

export default JSONAPISerializer.extend({
  keyForAttribute: function(attr) {
    return underscore(attr);
  },

  keyForRelationship: function(rawKey) {
    return underscore(rawKey);
  }
});

```

Make sure you restart your server after these changes so the initializer is run.

Hope this helps you out with your rails-api / Ember application.
