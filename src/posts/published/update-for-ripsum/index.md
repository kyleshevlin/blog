---

date: '2015-12-16'
slug: 'update-for-ripsum'
title: 'Update for Ripsum'
---

Tonight, I released version 0.1.2 of the [Ripsum gem](https://rubygems.org/gems/ripsum). This version adds a new feature to the gem, a configurable library of words. The user can now pass in their own choice of placeholder text. Hipster Ipsum. Zombie Ipsum. Harry Potter Ipsum. Whatever you choose.

This is done by adding an initializer file in your application. If you're using Rails, creating a new file in `config/initializers/` directory, perhaps named `ripsum_initializer.rb` and adding a configuration block to the file like so:

```ruby
Ripsum.configure do |config|
  config.library = "Your string of words here. You probably want a couple hundred words or more. Give yourself some variety."
end

```

Restart your server and boom, Ripsum is using your library of words to stress test your designs.
