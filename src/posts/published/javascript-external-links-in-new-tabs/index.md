---

date: '2016-03-26'
slug: 'javascript-external-links-in-new-tabs'
title: 'JavaScript: External Links in New Tabs'
---

I've written before about my not so mild hatred for the request to open all external links in new tabs. For those who don't know, this is done by adding `target="_blank"` to the anchor tag. I don't like doing this for so many reasons, but I'll save that rant for another blog post.

Now, I've been asked to do this so often that automating this process was long overdue. I spent a few minutes and wrote some JavaScript that programmatically looks for external links and adds `target="_blank"` to them if necessary.

Now, the defining characteristic of an externally pointing link is that it has to be an absolute path and thus start with "http". We can use this to target only those links. Here's how:

```javascript
function blankit() {
  var links = document.getElementsByTagName('a')

  for (var i = 0; i < links.length; i++) {
    if (/^http/.test(links[i].getAttribute('href'))) {
      links[i].setAttribute('target', '_blank')
    }
  }
}

blankit() // call this after the DOM is ready
```

This is pretty straightforward. Find all the links, loop through them and check if they begin with "http" (The use of `test()` instead of `match()` here is important since `test()` returns a boolean while `match()` returns an array or _null_). This means that relative links are given a pass, and links that happen to have "http" in them elsewhere, such as "/link-to-blog-about-http" don't get mistakenly modified.

I hope this helps and saves you some time.
