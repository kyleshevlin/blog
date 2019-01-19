---
categories: ['JavaScript', 'Web Development']
tags: ['Ember']
date: '2016-05-14'
slug: 'ember-hello-world'
subtitle: 'All the Different Ways to Make the Simplest Ember App'
title: 'Ember: Hello World'
---

[Ember.js](http://emberjs.com/) is one of several popular JavaScript MVCs on the market today and particularly my favorite to use. Known as "a framework for creating ambitious web applications", Ember is a great choice for building quality JavaScript SPAs. For those of you getting started with Ember, I'd like to walk you through building a "Hello World" app with [Ember CLI](http://ember-cli.com/), and I will show you several different ways to accomplish this goal. Doing so will teach you the different ways Ember can store and retrieve data inside and outside of the application. By the end, you should be able to build your own "Hello World" app in a matter of minutes.

To get started, you'll need to have Node, NPM, Bower, and Ember CLI installed on your machine. Node will allow you to install NPM and Bower, which are package managers, NPM for your Node dependencies and Bower for your front end dependencies. Ember CLI is Ember's command line integration allowing quick scaffolding and generation of files in your Ember application.

To install Ember CLI, run this in your terminal:

```bash
npm install -g ember-cli

```

To verify that Ember CLI installed, run this in your terminal:

```bash
ember -v

```

You should see some output that looks similar to this:

```bash
$ ember-cli 2.5.0
node 5.9.0
as: darwin x64

```

Once you have verified that you have Ember CLI installed, you're ready to create your first Ember app. Make and/or change to the directory you'd like to build your project in your terminal. Then run the `ember new <app-name>` commnad. Obviously, supply an app name ('hello-world' works!). Change directories into the new Ember application and run `ember serve` in the terminal. This will open a local server on port 4200. In your browser, type in `http://localhost:4200` and you should see "Welcome to Ember" in big letters.

Now that we have our application running, let's get it to say "Hello World" instead in a number of different ways.

### Hello World via Templates

The first most obvious way to have the app render "Hello World" is to simply make a change to the template. To do this, open the `application.hbs` file in your text editor. Change the contents of the `h2` tag to say "Hello World". Go back to your browser and refresh the page, you should see "Hello World" where "Welcome to Ember" was before.

If you didn't know, Ember, by default, uses livereload. Thus, if you are using a livereload extension, the page should refresh automatically when you update a template.

### Via Controllers

I hesitate to share this example as controllers will soon be deprecated in Ember, but having a better understanding of a framework's ecosystem never hurt anyone.

In Ember, there are a variety of ways we can supply data to our application. One of those ways is to store a property on a controller, and then call that property in the view with Handlebars helpers.

To start, we need to generate a controller file. To do this, run this command in your terminal:

```bash
ember generate controller application

```

This will create an `application.js` file under your app's `controllers` directory, and also create a test file for the controller. Open the new controller in your text editor.

In this file, within the `.extend()` function, add a property named `greeting` and give it a value of `'Hello World'`. Like so:

```javascript
import Ember from 'ember'

export default Ember.Controller.extend({
  greeting: 'Hello World'
})
```

Now, open your `application.hbs` file again, remove the text inside of the `h2` tag and replace it with `{{greeting}}`. This is a Handlebars helper which will retrieve the value of `greeting` from our controller, and render the template with that value. If you look at your application in the browser, it will still say "Hello World". Try changing the value of `greeting` in the controller to different values and see how the template automatically rerenders with each value change.

### Via Components

As I mentioned before, Controllers will soon be deprecated in Ember. Most Ember apps are built with Components instead. Components are like tiny, isolated, and reusable views. They follow the current proposed spec for Web Components very closely and are very easy to work with. Let's make a `hello-world` component and use that in our template.

To create a component with Ember CLI, run the following command in the terminal:

```bash
ember generate component hello-world

```

This command will generate a new `hello-world.js` file under the components directory, a corresponding template in the `templates/components` directory, and a test file for our new component. Let's start by opening up the `hello-world.js` file in our editor.

Just as we did with the controller, we can add properties to our components and call them in our component. Let's create another greeting property and give it a value like so:

```javascript
import Ember from 'ember'

export default Ember.Component.extend({
  componentGreeting: 'Hello World'
})
```

Then, we need to update the component template file. Remove the `{{yield}}` (I'll go over that another time), and replace it with:

```hbs
<h2 class="title">{{componentGreeting}}</h2>
```

Lastly, we need to add the component to our `application.hbs` file. Like so:

```hbs
{{hello-world}}

{{outlet}}

```

Now when we refresh the page, the `componentGreeting` property is being inserted into our component and our component into the template. You can try adding multiple `{{hello-world}}` components to the page to see that each one is a separate element.

### Via Routes

While it is possible to pass data into templates by using controllers and components, it is more typical to pass data into templates by using routes. Ember routes have a `model()` method that is used to return data to templates. Typically, in an application we would use this method to return data from an API, but we can also use it to return a static set of data such as a string.

To start this exercise, we're going to create a route with Ember CLI:

```bash
ember generate route index

```

This will create an `index.js` file in the routes directory, a `index.hbs` file in the templates directory and, you guessed it, a test file.

In the newly created route file, let's use the `model()` method to return `'Hello World'` to our template. Add this to the `index.js` file:

```javascript
import Ember from 'ember'

export default Ember.Route.extend({
  model() {
    return 'Hello World'
  }
})
```

Now, that we have wired up the `model()` method, we can call the `{{model}}` Handlebars helper in the `index.hbs` file to display the returned data. Like this:

```hbs
<h2 class="title">{{model}}</h2>

```

The index template will display in the `{{outlet}}` of the application template, and thus, "Hello World" shows up when we refresh the page. Try changing the value returned in the `model()` method to see how routes work.

### Via Services

All right, let's do this _one_ more way. An Ember Service is a singleton that lasts the entire lifecycle of the application (but isn't initiated until it is requested, this is just good knowledge to know). With controllers on their way out, services become our go to choice for long-lasting, persistent data and/or objects in our application.

As with every other method we've done thus far, we're going to begin by using Ember CLI to generate our service:

```bash
ember generate service hello-world

```

As you might expect by now, Ember CLI created for us a `hello-world.js` file in the services directory and a test file. Open this new service file in your text editor. We're going to add a property on to our service like so:

```javascript
import Ember from 'ember'

export default Ember.Service.extend({
  sayHello: 'Hello World'
})
```

Next, we're going to modify the index route created in the previous exercise. Services are available just about anywhere in your Ember application. Thus, a service is a great place to store data that needs to accessed from routes, controllers, components, etc. In order to get the data stored in the service, we need to inject it into our object. Open up the index route file in your text editor, and make the following adjustments:

```javascript
import Ember from 'ember'

const { inject } = Ember

export default Ember.Route.extend({
  helloWorld: inject.service(),
  model() {
    return this.get('helloWorld').sayHello
  }
})
```

This is slightly more complicated than the rest of our code up to this point. Let's start with the `const`. Here, we are using an ES6 feature known as [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). Destructuring allows us to create variables that are shortcuts to properties on an object. This might be easiest to understand with a visual.

```javascript
const { inject } = Ember

// This is the same as above.
var inject = Ember.inject
```

If we wanted to create multiple `const`s, we can comma separate property names on the assigned object. Using destructuring might seem like overkill at this moment, but it is a pattern you will see frequently in Ember applications and it is worth using and understanding as soon as possible.

Moving on, we add a property to our route that is the camelCased equivalent of the name of our service. This allows the service to be injected without passing in an argument for the service name. If we wanted to name our route property something different, we would have to pass in the name of our service to the `service()` function, like so:

```javascript
otherPropertyName: inject.service('hello-world')
```

Now that the service is injected into our route, we can access any properties on the service using Ember's `get()` method. Inside of the model function, we return the value of the `sayHello` property on our hello-world service. Since our previous example already displayed the model value in the template, our application should now display "Hello World" once more.

### Conclusion

Ember has no shortage of ways to display your application's data. Hopefully now you understand a number of those different ways. Depending on the needs of your application, you might find one way more particularly helpful than another. If you ever have questions regarding what might be the best strategy for your particular challenge, I'd like to recommend you check out the [Ember Discussion Forums](http://discuss.emberjs.com/) or join the [Ember Slack Community](https://ember-community-slackin.herokuapp.com/). There are always helpful people around to answer your questions.

If you would like to see the code for this tutorial you can find it [here on Github](https://github.com/kyleshevlin/ember-hello-world). If you look at the commit history, you can walk through all the changes in the order I have written them here.

As always, if you have any questions, either leave them in the comments, shoot me an email, or hit me up on Twitter.
