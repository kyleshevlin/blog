import React from 'react'
import Container from './Container'
import Footer from './Footer'
import { FootnoteDisplay } from './Footnotes'
import Header from './Header'
import { bs } from '../shevy'
import AllGlobalStyles from '../styles/AllGlobalStyles'
import AnnouncementBanner from './AnnouncementBanner'
import { buttonStyles } from './Button'

export default function Layout({ children }) {
  return (
    <>
      <AllGlobalStyles />
      <AnnouncementBanner>
        I unashamedly support{' '}
        <a
          css={theme => ({
            color: theme.colors.background,
            display: 'inline-block',
            marginLeft: 4,

            '&:hover': {
              color: theme.colors.offsetMore,
            },
          })}
          href="https://blacklivesmatter.com/"
        >
          <strong>#BlackLivesMatter</strong>
        </a>
        . Consider making a donation to them today.
        <a
          css={theme => ({
            ...buttonStyles(theme),
            marginLeft: bs(0.5),
            backgroundColor: theme.colors.background,
            color: theme.colors.accent,

            '&:hover': {
              backgroundColor: theme.colors.offsetMore,
              color: theme.colors.accent,
            },
          })}
          href="https://secure.actblue.com/donate/ms_blm_homepage_2019"
        >
          Donate Now
        </a>
      </AnnouncementBanner>
      <Header />
      <main
        css={{
          paddingBottom: bs(2),
          minHeight: '65vh',
        }}
        role="main"
      >
        <Container>{children}</Container>
      </main>
      <Footer />
      <FootnoteDisplay />
    </>
  )
}
