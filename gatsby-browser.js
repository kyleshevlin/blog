/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import CustomLayout from './src/wrapPageElement'
import 'prism-theme-night-owl/build/no-italics.css'
import './src/styles/blackout-theme.css'

export const wrapPageElement = CustomLayout
