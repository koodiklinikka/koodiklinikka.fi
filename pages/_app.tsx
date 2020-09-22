import React from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Koodiklinikka on suomalainen yhteisö ohjelmistoalan harrastajille ja ammattilaisille."
        />
        <meta
          name="keywords"
          content="ohjelmointi,frontend,open source,devaus,suomi,javascript,clojure,go,java,node.js,io.js,angular.js,web"
        />
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/icons/site.webmanifest"/>
        <meta property="og:image" content="images/logo.png"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
