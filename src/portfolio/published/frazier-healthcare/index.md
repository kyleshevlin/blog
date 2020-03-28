---
date: '2016-02-23'
slug: 'frazier-healthcare'
status: 'archived'
title: 'Frazier Healthcare'
squareImage: './images/alan_frazier.jpg'
---

[Frazier Healthchare Partners](http://www.frazierhealthcare.com) was a project that began in the late spring of 2015. This site was significantly larger than both Eroica or Motto. I took great pride in getting to craft the front end architecture for such a large site and had the opportunity to write a lot of JavaScript functionality into the site as well.

Starting with the homepage, we have a dynamically driven carousel. What might not be obvious, is that there are actually _two_ carousels. The images on the right and the small block of text on the left are two separate carousels, which gave me greater control when positioning them for responsivity. Thanks to [Ken Wheeler and his excellent slider plugin, Slick](http://kenwheeler.github.io/slick/), it was easy to configure two carousels to utilize the same navigation.

As one moves through the site, you will come across the portfolio page. This page had two particular challenges: a robust filter and a responsive tile layout.

Starting with the filter, this filter had the requirement that `buttons` and `selects` looked and behaved similar, despite their inherent (and significant) differences. Eventually, with the use of [Chosen](https://harvesthq.github.io/chosen/) and some custom JavaScript, we were able to update hash params via selections or buttons in this filter, ajaxing in a new set of data and refreshing the information on the page.

As for the tiles themselves, this project was the first project I embarked on using [Susy](http://susy.oddbird.net/) at FINE on such a scale. I had used Susy multiple times before, but this marked the first time I used it on a component by component basis. I remember initially struggling with getting the tiles to line up, given that the number of tiles in a row would change per breakpoint and all of the `nth-child` possibilities were beginning to become too cumbersome to work with. Then, I had a small epiphany. Susy enables the developer to set custom `$susy` maps and utilize them at any time. Thus, for the tile section, I moved the gutter position from after (on the right) to split. Then, by setting a negative left and right margin on the parent container equal to the width of the split margins, I was able to get perfectly fluid and responsive tiles regardless of number of items in a row without needing `nth-child` psuedo-selectors. I have since used this same pattern in multiple other venture capital sites (they love their logos!).

Let me show you how that's done:

```scss
// Example default Susy map
$susy: (
  columns: 12,
  gutters: 1/8,
  gutter-position: after
);

// Tiles custom map
$tiles: (
  columns: 2,
  gutters: 1/8,
  gutter-position: split
);

// Use Susy layout function to make shorthand
// tweaks to Susy maps
$tiles--medium: layout($tiles, 3);
$tiles--large: layout($tiles, 4);

// Styles
.tiles {
  @include clearfix; // Assuming you've made a clearfix mixin, which you should
  @include with-layout($tiles) {
    margin-left: gutters() * -1;
    margin-right: gutters() * -1;
  }

  @include bp(medium) {
    // Redefine per Susy context
    @include with-layout($tiles--medium) {
      margin-left: gutters() * -1;
      margin-right: gutters() * -1;
    }
  }

  @include bp(large) {
    // Redefine per Susy context
    @include with-layout($tiles--large) {
      margin-left: gutters() * -1;
      margin-right: gutters() * -1;
    }
  }
}

.tile-item {
  @include with-layout($tiles) {
    @include span(1);
  }

  @include bp(medium) {
    @include with-layout($tiles--medium) {
      @include span(1);
    }
  }

  @include bp(large) {
    @include with-layout($tiles--large) {
      @include span(1);
    }
  }
}
```

Overall, Frazier Healthcare was a great and fun challenge to work on. I came away with a few new skills and the client came away with a great working website. Be sure to check it out.

[Visit the site](http://www.frazierhealthcare.com)
