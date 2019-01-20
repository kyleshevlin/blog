---
date: '2016-04-29'
link: 'http://www.ta.com'
slug: 'ta-associates'
status: 'archived'
title: 'TA Associates'
squareImage: './images/ta_portfolio.png'
---

In March 2016, TA Associates launched a new website. I acted as tech lead for the project, did all the front end work, and a few tidbits of back end work as well.

During the course of building this project, I was tasked with coming up with a more elegant way of loading the many large images onto the site, i.e. find a way to make the page load seem faster and smoother than jerking an image into place once it's loaded. I ended up coming up with a process I have since repeated on other sites and plan to keep using. Let me show you how to do it.

The technique is pretty simple. We give our image a wrapping `div` and create an empty `div` as a sibling to the image. Then, using a padding hack, we give the empty div the same dimensions as the image to be loaded. The image is absolutely positioned to fill our wrapping `div` and thus takes up the same space as our empty `div`.

The markup looks something like this:

```html
<div class="hero">
  <div class="hero-blank_space"></div>
  <img class="hero-image" src="http://placehold.it/450x300" />
</div>
```

And the CSS thus far looks like:

```scss
.hero {
  position: relative;

  &-blank_space {
    width: 100%;
    padding-bottom: 66.67%; // let's use a 1.5/1 ratio for this example
  }

  &-image {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
```

However, this isn't enough. We need to hide the image until we know it's loaded. Easiest way to do that is to use the [imagesLoaded](http://imagesloaded.desandro.com/) library. Once the images are loaded, we add a state class to the wrapper and adjust the CSS.

Our updated CSS looks like this:

```scss
.hero {
  position: relative;

  &-blank_space {
    width: 100%;
    padding-bottom: 66.67%; // let's use a 1.5/1 ratio for this example
  }

  &-image {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.5s ease;

    .images-loaded & {
      opacity: 1;
    }
  }
}
```

We keep the image transparent until the state class indicates that the image is ready to be seen. The transition makes for a nice fading in effect. You can adjust this to taste in your own project!
