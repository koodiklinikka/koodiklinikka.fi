import React from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="title"
          content="Koodiklinikka – Suomen suurin ohjelmistoalan yhteisö"
        />
        <meta
          name="description"
          content="Koodiklinikka on suomalainen yhteisö ohjelmistoalan harrastajille ja ammattilaisille."
        />
        <meta
          name="keywords"
          content="ohjelmointi,frontend,open source,devaus,suomi,javascript,clojure,go,java,node.js,io.js,angular.js,web"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://koodiklinikka.fi/" />
        <meta
          property="og:title"
          content="Koodiklinikka – Suomen suurin ohjelmistoalan yhteisö"
        />
        <meta
          property="og:description"
          content="Koodiklinikka on Suomen suurin ohjelmistoalan yhteisö, joka kokoaa työntekijät, harrastajat ja vasta-alkajat yhteen. Tarkoituksenamme on yhdistää ja kasvattaa suomalaista ohjelmointiyhteisöä, sekä tarjota apua ja uusia kontakteja ohjelmoinnista innostuneille nuorille."
        />
        <meta
          property="og:image"
          content="https://koodiklinikka.fi/static/images/meta.jpg"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://koodiklinikka.fi/" />
        <meta
          property="twitter:title"
          content="Koodiklinikka – Suomen suurin ohjelmistoalan yhteisö"
        />
        <meta
          property="twitter:description"
          content="Koodiklinikka on Suomen suurin ohjelmistoalan yhteisö, joka kokoaa työntekijät, harrastajat ja vasta-alkajat yhteen. Tarkoituksenamme on yhdistää ja kasvattaa suomalaista ohjelmointiyhteisöä, sekä tarjota apua ja uusia kontakteja ohjelmoinnista innostuneille nuorille."
        />
        <meta
          property="twitter:image"
          content="https://koodiklinikka.fi/static/images/meta.jpg"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
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
        <link rel="manifest" href="/static/icons/site.webmanifest" />
        <meta property="og:image" content="images/logo.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
