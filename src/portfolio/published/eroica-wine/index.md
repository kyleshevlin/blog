---
date: '2015-12-01'
link: 'http://www.eroicawine.com'
slug: 'eroica-wine'
status: 'archived'
title: 'Eroica Wine'
squareImage: './images/eroica_square.jpg'
bannerImage: './images/eroica_hero.jpg'
---

Earlier this year (February 2015), I had my first opportunity at FINE to build the entire front-end for a project. That's right, toss the young'n his first set of keys and pray he doesn't wreck the car.

For the record, I didn't wreck the car. I brought the car home without a scratch and a full tank of gas.

The most interesting and challenging part of this front-end build was developing a "grid" framework to handle the layout responsively. And yes, I used quotes on purpose.

To call this a grid would be a lie. Grids consist of multiple columns inside a container that theoretically flow down the entire page, wrangling content into alignment. However, our team of designers created a "zigzag" layout (their words, not mine). Sure, there are lines and things align, but they break some conventions in unexpected ways.

The layout of this site mostly consists of sections comprised of two blocks. These blocks are complimentary widths, one wider than the other, that span what typically would be designated a grid row. The markup utilizes classes to modify order and float direction, depending upon the underlying content, in order to accomplish the desired responsivity. These classes were used to cascade the correct inner floats based upon content. You'll notice that in some places we've accomplished a faux `float: center;` because of this. A prime example of this can be found on the [Winemaking](http://www.eroicawine.com/winemaking) page. Here is a look at the markup for the section.

```markup
<section class="main container">
  <div class="grid zigzag">
    <div class="zigzag-pair items-float-left">
      <div class="zigzag-item img on-left"></div>
      <div class="zigzag-item text"></div>
    </div>
    <!-- /.zigzag-pair -->

    <div class="zigzag-pair items-float-right">
      <div class="zigzag-item img on-right"></div>
      <div class="zigzag-item text"></div>
    </div>
    <!-- /.zigzag-pair -->
  </div>
</section>

```

And some SCSS for it, too:

```scss
// Zigzag grid
.zigzag {
  @include clearfix;

  &-pair {
    @include clearfix;

    & + & {
      margin-top: 40px;

      @include bp(bravo) {
        margin-top: 60px;
      }

      @include bp(charlie) {
        margin-top: 80px;
      }
    }
  }

  &-item {
    & + & {
      margin-top: 40px;

      @include bp(bravo) {
        margin-top: 60px;
      }

      @include bp(charlie) {
        margin-top: auto;
      }
    }

    .items-float-left & {
      float: left;
    }

    .items-float-right & {
      float: right;
    }
  }

  .text {
    @include bp(bravo) {
      float: right;
      width: 460px; // + 80px margin makes 540px
      margin-left: 40px;
      margin-right: 40px;
    }

    @include bp(charlie) {
      width: 380px;
      margin-top: 60px; // Lost vertical alignment since we needed to use floats
    }
  }

  .img {
    @include bleed(30px); // Negative margins

    @include bp(alpha) {
      @include bleed(40px);
    }

    @include bp(bravo) {
      @include clot; // Stop the "bleeding"
    }

    @include bp(charlie) {
      &:after {
        @include line-overlay;
        top: 0;
      }

      &.on-left:after {
        right: 40px;
      }

      &.on-right:after {
        left: 40px;
      }
    }
  }
}
```

Always enjoy using the `& + &` trick. The parent selector in SCSS is a wonderful tool to wield responsibly.

As you can see, this layout flows well responsively despite its less than intuitive layout. It's a fine example of taking a designer's idea and finding a logical and manageable way of accomplishing it.

I hope you enjoy the site. Order some wine, you'll enjoy it even more.
