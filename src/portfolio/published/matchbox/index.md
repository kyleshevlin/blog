---
date: '2017-02-21'
slug: 'matchbox'
status: 'archived'
title: 'Matchbox'
squareImage: './images/matchbox-logo.jpg'
---

Matchbox is a simple, vanilla JavaScript plugin that... well... matches the height of boxes.

One thing designers are consistently surprised to find out is that up until very recently, CSS had no way of knowing the relationship of heights between adjacent boxes. For years, we've been making designs with a set of boxes set across the width of the screen that are all supposed to the same height despite their inner content being of different heights. This is an easy solution if you can "fix" the heights of the boxes, but not so easy when the content is dynamic. I developed this plugin to solve this problem.

Matchbox takes a group of elements, finds the tallest one and matches the height of the boxes to that height. It updates when you resize the browser window and can be configured to use a different amount of elements per breakpoint.

[Link to Project](https://github.com/kyleshevlin/matchbox)
