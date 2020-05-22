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

const GlobalStyles = () => (
  <Global
    styles={css`
      @font-face {
        font-family: 'Droid Serif';
        font-style: normal;
        font-weight: normal;
        src: url('${DroidSerifWoff}') format('woff');
        font-display: swap;
      }

      @font-face {
        font-family: 'Droid Serif';
        font-style: normal;
        font-weight: bold;
        src: url('${DroidSerifBoldWoff}') format('woff');
        font-display: swap;
      }

      @font-face {
        font-family: 'Catamaran';
        font-style: normal;
        font-weight: normal;
        src: url('${catamaranRegularWoff2}') format('woff2'),
             url('${catamaranRegularWoff}') format('woff');
        font-display: swap;
      }

      @font-face {
        font-family: 'Catamaran';
        font-style: normal;
        font-weight: 100;
        src: url('${catamaranThinWoff2}') format('woff2'),
             url('${catamaranThinWoff}') format('woff');
        font-display: swap;
      }

      @font-face {
        font-family: 'Catamaran';
        font-style: normal;
        font-weight: 700;
        src: url('${catamaranBoldWoff2}') format('woff2'),
             url('${catamaranBoldWoff}') format('woff');
        font-display: swap;
      }
    `}
  />
)

export default GlobalStyles
