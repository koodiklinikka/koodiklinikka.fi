import React from "react";
import Head from "next/head";

import "../styles/style.scss";

const metaImage = "/static/images/meta.jpg";
const metaDescription =
  "Koodiklinikka on Suomen suurin ohjelmistoalan yhteisö, joka kokoaa työntekijät, harrastajat ja vasta-alkajat yhteen. Tarkoituksenamme on yhdistää ja kasvattaa suomalaista ohjelmointiyhteisöä, sekä tarjota apua ja uusia kontakteja ohjelmoinnista innostuneille nuorille.";
const metaShortDescription =
  "Koodiklinikka on suomalainen yhteisö ohjelmistoalan harrastajille ja ammattilaisille.";
const metaTitle = "Koodiklinikka – Suomen suurin ohjelmistoalan yhteisö";
const metaKeywords =
  "ohjelmointi,frontend,open source,devaus,suomi,javascript,clojure,go,java,node.js,io.js,angular.js,web";
const metaUrl = "https://koodiklinikka.fi/";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="title" content={metaTitle} />
        <meta name="description" content={metaShortDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={metaUrl} />
        <meta property="twitter:title" content={metaTitle} />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content={metaImage} />
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
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
