import Head from 'next/head'
import Router from 'next/router'
import SimpleReactLightbox from 'simple-react-lightbox'
import { ThemeProvider } from 'next-themes'
import { appWithTranslation } from 'next-i18next'
import TagManager from 'react-gtm-module'
import nextI18NextConfig from '../next-i18next.config'

import Header from 'components/Header'

import { pageview } from 'lib/gtag'

import '@primer/css/index.scss'
import 'styles/globals.scss'
import 'styles/primer-dark.scss'
import 'styles/linegutter.scss'
import '@yukaii/github-highlightjs-themes/themes/github-light-default.css'
import { DefaultSeo } from 'next-seo'
import Script from 'next/script'

Router.events.on(
  'routeChangeComplete',
  (url) => process.env.NODE_ENV === 'production' && pageview(url)
)

const tagManagerArgs = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
}

if (tagManagerArgs.gtmId) {
  TagManager.initialize(tagManagerArgs)
}

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta name="color-scheme" content="dark light" />
        <meta property="og:image" content="/favicon.png" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <DefaultSeo
        description="HackMD's Official Blog"
        titleTemplate="%s | HackMD Blog"
        defaultTitle="HackMD Blog"
        openGraph={{
          type: 'article',
          locale: 'zh-Hant-TW',
          title: 'HackMD Blog',
          site_name: 'HackMD Blog',
          description: 'HackMD Blog',
        }}
      />
      <ThemeProvider attribute="data-color-mode">
        <SimpleReactLightbox>
          <div className="overflow-x-hidden pt-10">
            <Header />
            <Component {...pageProps} key={router.route} />
          </div>
        </SimpleReactLightbox>
      </ThemeProvider>
      <Script src="/noflash.js" strategy="beforeInteractive" />
    </>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
