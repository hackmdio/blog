import Head from 'next/head'
import Router from 'next/router'

import '@primer/css/index.scss'
import 'styles/globals.css'

import 'highlight.js/styles/github-gist.css'
import { pageview } from 'lib/gtag'

Router.events.on('routeChangeComplete', (url) => pageview(url))

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
