import { injectGlobal } from 'emotion'
import catamaranBoldWoff from '../fonts/catamaran-bold-webfont.woff'
import catamaranBoldWoff2 from '../fonts/catamaran-bold-webfont.woff2'
import catamaranRegularWoff from '../fonts/catamaran-regular-webfont.woff'
import catamaranRegularWoff2 from '../fonts/catamaran-regular-webfont.woff2'
import catamaranThinWoff from '../fonts/catamaran-thin-webfont.woff'
import catamaranThinWoff2 from '../fonts/catamaran-thin-webfont.woff2'
import DroidSerifWoff from '../fonts/DroidSerif-Regular-webfont.woff'

injectGlobal`
  @font-face {
    font-family: 'Droid Serif';
    font-style: normal;
    font-weight: normal;
    src: url('${DroidSerifWoff}') format('woff');
  }

  @font-face {
    font-family: 'Catamaran';
    font-style: normal;
    font-weight: normal;
    src: url('${catamaranRegularWoff2}') format('woff2'),
          url('${catamaranRegularWoff}') format('woff');
  }

  @font-face {
    font-family: 'Catamaran';
    font-style: normal;
    font-weight: 100;
    src: url('${catamaranThinWoff2}') format('woff2'),
          url('${catamaranThinWoff}') format('woff');
  }

  @font-face {
    font-family: 'Catamaran';
    font-style: normal;
    font-weight: 700;
    src: url('${catamaranBoldWoff2}') format('woff2'),
          url('${catamaranBoldWoff}') format('woff');
  }
`
