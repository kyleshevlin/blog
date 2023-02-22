/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import { headScript } from './src/utils/cssCustomPropertySetter'

export { wrapRootElement } from './src/wrapRootElement'

const CssCustomPropertySetter = React.createElement('script', {
  key: 'CssCustomPropertySetter',
  dangerouslySetInnerHTML: {
    __html: headScript,
  },
})

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([CssCustomPropertySetter])
}
