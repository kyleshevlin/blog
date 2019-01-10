import { injectGlobal } from 'emotion'
import { bs } from '../shevy'

injectGlobal`
  .twitter-tweet-rendered {
    margin-top: ${bs()} !important;
    margin-bottom: ${bs()} !important;
  }
`
