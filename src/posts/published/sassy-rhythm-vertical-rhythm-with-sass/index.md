---
categories: ['Web Development']
tags: ['CSS', 'Sass']
date: "2014-07-03"
slug: "sassy-rhythm-vertical-rhythm-with-sass"
status: "publish"
title: "Sassy Rhythm: Vertical Rhythm with Sass"
---

So I want to take my first stab at writing an article about front-end web development. I don't claim to have any great expertise in the field, but recently I redesigned my blog and wanted to share a technique I developed in the process that I thought could be very useful to other designers and developers.

If you've been around web design for even a small amount of time, it's likely that you've come across the term "vertical rhythm". In short, vertical rhythm describes the spacing of all elements in a design as you move up and down. This doesn't simply include text. This also includes any elements on your page that take up vertical space, like buttons, divs, etc.

A good way to visualize vertical rhythm is to think back to when you used lined notebooks in school. Each line on the page took up an equal height, creating a cadence that traversed the entire page. When creating a web design, it is both functional and more aesthetically pleasing to the eye to create a baseline for your vertical rhythm, and have every element aligned to that rhythm.

While in theory this seems simple enough, it is often much more difficult for web designers to achieve in the browser than it is for our designers to accomplish in Photoshop. Let's talk about some of the problems developers face in trying to establish solid vertical rhythm and then I'll share the technique I used to over come this.

### Typography

The biggest challenge to having good vertical rhythm is dealing with typography. For starters, not all typefaces are equally heighted, and thus establishing our line-height based on the height of the typography can be problematic when we mix typefaces. For example, a typical declaration for font may look like this:

```
body {
    font: 100%/1.5 Helvetica, Arial, sans-serif;
}

```

With this we declare that the line height will be 1.5x the height of the font. But if change the font from Helvetica, Arial, sans-serif, we might find that the line-height is not exactly the same. If we have used a fixed pixel on any margins between paragraphs or other nearby elements, we might find that our layout now looks off in certain places.

Also, we don't want all of our typography to be the same size. If it was, we'd lose the heirarchical structure of information that we are seeking by using different sizes. This presents us with a problem if we use a line-height based on font-size. For example:

```
h1 {
    font-size: 36px;
    line-height: 1.5;
}

h2 {
    font-size: 29px;
    line-height: 1.5;
}

```

Using this example, we can quickly see that these line-heights will give us odd heights that don't seem to fit a pattern. The line-height on the `<h1>` tag would be 54px, while the line height for the `<h2>` tag would be 43.5px. We could solve this by setting each line height with a fixed pixel height, but this will (potentially) fall apart if the user uses the zoom feature of their web browsers.

### Fixed Dimensions

One of the most common issues I find when working with NCDs (non-coding designers, can we make this a real term?) is the difference in our approach to padding and margins. NCD's typically want fixed widths on elements and to constrain content to that. As a developer, understanding that text is dynamic and that I can pattern for that, I prefer to set paddings and margins on my elements in such a way that they maintain the horizontal and vertical rhythms of the design without the restrictions of fixed widths. Let's make a simple example of this:

<p data-height="315" data-theme-id="0" data-slug-hash="xuDCg" data-default-tab="result" class="codepen">See the Pen <a href="http://codepen.io/kyleatfine/pen/xuDCg/">Example for blog post Sassy Rhythm</a> by Kyle Shevlin (<a href="http://codepen.io/kyleatfine">@kyleatfine</a>) on <a href="http://codepen.io">CodePen</a>.</p>

<script async src="//codepen.io/assets/embed/ei.js"></script>

The first two buttons look identical, but were achieved in very different ways. If we have strict control over the text, either way might be a viable option (though you also have to use a line-height hack to achieve vertical centering in the first button). But as soon as we change the length of the text, our button falls apart unless we allow the content to define the size of the button like the fourth example. In short, this problem can occur in any instance where text can be added dynamically by the user and can quickly ruin the rhythm of our layout.

Perhaps I am personally biased, but I think it is both safer and more useful to allow the size of containers to be determined by their content, and not vice versa. It may be defensive design, but fewer things break and those worst-case scenarios don't leave you scratching your head for a fix.

### So what's the solution?

In my recent redesign of my website, I wanted to come up with a really simple system of establishing vertical (and horizontal) rhythms that would work responsively. It turns out the answer is really simple, if you're using Sass. Here it is in all its glory:

```
$bl: 1.8rem;

```

That's it! What I did was establish a "baseline" variable and set it to root ems. A root em bases its size on the font-size of the root element, in this case, the `<html>` tag. Whatever the font-size of the tag, the baseline is 1.8x that amount. Then, for all my line-heights, margins and paddings, I simply set them to multiples (or divisions) of the $bl variable. Let's create a simple example:

<p data-height="315" data-theme-id="0" data-slug-hash="tDxHC" data-default-tab="result" class="codepen">See the Pen <a href="http://codepen.io/kyleatfine/pen/tDxHC/">Example for Sassy Rhythm #2</a> by Kyle Shevlin (<a href="http://codepen.io/kyleatfine">@kyleatfine</a>) on <a href="http://codepen.io">CodePen</a>.</p>

<script async src="//codepen.io/assets/embed/ei.js"></script>

As you can see, it's a very simple technique to use that comes with some added benefits. If I did this with regular ems, I would have to do some complicated maths to figure out all the right heights and margins depending upon the font-size of the containing element. Using rems allows me to avoid this. Secondly, I can modify the size of the font on the `<html>` element and still maintain all the same rhythmical relationships throughout the entire design. Lastly, to try other baselines out on my design, I simply change the variable and the entire design adjusts accordingly.

### Conclusion

Long story short, if you want solid rhythm in your design, consider setting a baseline variable and basing all your rhythmical decisions on it.

I hope you find this technique useful, and perhaps can implement this into one of your designs. If you think of any drawbacks to this technique, I'd love to hear it in the comments. I'm always looking to learn and improve, and feedback is a great way to do that. Also, if you can think of even more uses for this technique, I'd love to hear about that, too. Maybe make a CodePen displaying your use of this baseline variable and share it with me.
