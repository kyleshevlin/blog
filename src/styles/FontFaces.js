import React from 'react'
import { Global, css } from '@emotion/core'
import catamaranBoldWoff from '../fonts/catamaran-bold-webfont.woff'
import catamaranBoldWoff2 from '../fonts/catamaran-bold-webfont.woff2'
import catamaranRegularWoff from '../fonts/catamaran-regular-webfont.woff'
import catamaranRegularWoff2 from '../fonts/catamaran-regular-webfont.woff2'
import catamaranThinWoff from '../fonts/catamaran-thin-webfont.woff'
import catamaranThinWoff2 from '../fonts/catamaran-thin-webfont.woff2'
import DroidSerifWoff from '../fonts/DroidSerif-Regular-webfont.woff'
import DroidSerifBoldWoff from '../fonts/DroidSerif-Bold-webfont.woff'

export default function FontFaces() {
  return (
    <Global
      styles={css`
      @font-face {
        font-family: 'Droid Serif';
        font-style: normal;
        font-weight: normal;
        font-display: swap;
        src: url('${DroidSerifWoff}') format('woff');
      }

      @font-face {
        font-family: 'Droid Serif';
        font-style: normal;
        font-weight: bold;
        font-display: swap;
        src: url('${DroidSerifBoldWoff}') format('woff');
      }

      @font-face {
        font-family: 'Catamaran';
        font-style: normal;
        font-weight: normal;
        font-display: swap;
        src: url('${catamaranRegularWoff2}') format('woff2'),
             url('${catamaranRegularWoff}') format('woff');
      }

      @font-face {
        font-family: 'Catamaran';
        font-style: normal;
        font-weight: 100;
        font-display: swap;
        src: url('${catamaranThinWoff2}') format('woff2'),
             url('${catamaranThinWoff}') format('woff');
      }

      @font-face {
        font-family: 'Catamaran';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('${catamaranBoldWoff2}') format('woff2'),
             url('${catamaranBoldWoff}') format('woff');
      }
    `}
    />
  )
}
