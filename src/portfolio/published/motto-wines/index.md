---
date: '2015-12-02'
link: 'https://www.mottowines.com/'
slug: 'motto-wines'
status: 'published'
title: 'Motto Wines'
squareImage: './images/motto_square.jpg'
bannerImage: './images/motto_wines_hero.jpg'
---

Part way through building the [Eroica Wine](/portfolio/eroica-wine) project, I was quickly kicked off on a new project that needed to be done in two weeks. I kid you not. Entire site built and ready for production in two weeks. We would normally take at least two months on a build like this.

What made this task even more difficult was an incredibly challenging layout. In the end, we achieved a pretty interesting responsive layout that is JavaScript dependent, but degrades gracefully.

If you scroll down the [home page](http://www.mottowines.com), you'll stumble upon what the designer called the "collage grid". The requirements for items in the grid were that they push to the center, regardless of width, and that they stack masonry style. This required, surprise surprise, [Isotope](http://isotope.metafizzy.co/), I fooled you, to accomplish (we needed custom ordering of tiles, a feature of Isotope).

Isotope handled the stacking, but we still needed objects to push to the center. The way to handle this was using equally widthed wrapping divs and push the inner contents left or right via `margin-left: auto;` or `margin-right: auto;`. It's easy to forget that `margin`s are capable of pushing blocks like floats without a clearfix needed.

Here's some of the Sass:

```scss
.collage {
  width: 100%;
  font-size: 0; // Inline-block hack

  &--with-margin-top {
    margin-top: 60px;

    @include bp(bravo) {
      margin-top: 100px;
    }
  }

  img {
    display: inline-block;
    width: 100%;
  }

  &-item {
    display: inline-block;
    vertical-align: middle;
    width: 100%;

    @include bp(alpha) {
      width: 50%;
    }

    // If a text block is the first child in collage
    // no padding top
    &:first-child .text {
      padding-top: 0;
    }
  }

  &-item-content {
    @include bp(alpha) {
      max-width: 375px;
    }

    @include bp(bravo) {
      max-width: 550px;
    }

    @include bp(charlie) {
      max-width: 640px;
    }

    // These classes move content towards center, added via JS
    .is-on-left &,
    .is-on-left & > * {
      @include bp(alpha) {
        margin-left: auto;
      }
    }

    .is-on-right &,
    .is-on-right & > * {
      @include bp(alpha) {
        margin-right: auto;
      }
    }

    // For narrow content
    &.narrow {
      @include bp(alpha) {
        width: 86.67%;
        max-width: 300px;
      }

      @include bp(bravo) {
        max-width: 440px;
      }

      @include bp(charlie) {
        max-width: 520px;
      }
    }

    // Content types
    &.text {
      padding-top: 30px;
      padding-bottom: 30px;

      @include bp(alpha) {
        padding-top: 40px;
        padding-bottom: 40px;
      }

      @include bp(bravo) {
        padding-top: 60px;
        padding-bottom: 60px;
      }

      .is-on-left & {
        @include bp(alpha) {
          padding-right: 40px;
        }

        @include bp(collage-content-tweak) {
          padding-right: 50px;
        }

        @include bp(bravo) {
          padding-right: 75px;
        }
      }

      .is-on-right & {
        @include bp(alpha) {
          padding-left: 40px;
        }

        @include bp(collage-content-tweak) {
          padding-left: 50px;
        }

        @include bp(bravo) {
          padding-left: 75px;
        }
      }
    }
  }
}
```

And the JS that fires all of that:

```javascript
'use strict'

Collage = {
  init: function() {
    this.collageImagesLoaded()
  },

  collageImagesLoaded: function() {
    var _this = this

    imagesLoaded($('.collage'), function() {
      _this.collageIsotope()
    })
  },

  collageIsotope: function() {
    var _this = this

    $('.collage').isotope({
      itemSelector: '.collage-item',
      sortBy: 'original-order'
    })

    _this.isotopeLayoutComplete()
    _this.collageItemPositions()
  },

  isotopeLayoutComplete: function() {
    var _this = this

    $('.collage').isotope('on', 'layoutComplete', function(items) {
      _this.collageItemPositions()
    })
  },

  collageItemPositions: function() {
    var $items = $('.collage-item')

    $items.each(function() {
      $(this).removeClass('is-on-left is-on-right')

      if ($(this).css('left') == '0px') {
        $(this).addClass('is-on-left')
      } else {
        $(this).addClass('is-on-right')
      }
    })
  }
}
```

In the end, we've got a collage grid that accomplishes all our goals and works responsively, too.
