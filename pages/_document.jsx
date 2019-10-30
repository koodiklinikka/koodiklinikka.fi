import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { Footer } from "../components/Footer";
import Fader from "../components/Fader";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="fi">
        <Head>
          <meta
            name="description"
            content="Koodiklinikka on suomalainen yhteisö ohjelmistoalan harrastajille ja ammattilaisille."
          />
          <meta
            name="keywords"
            content="ohjelmointi,frontend,open source,devaus,suomi,javascript,clojure,go,java,node.js,io.js,angular.js,web"
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
          <link rel="manifest" href="/static/cons/site.webmanifest" />
          <meta property="og:image" content="images/logo.png" />
          <script src="https://js.stripe.com/v3/" />
          <script src="//use.typekit.net/scb5xny.js" />
          <script>{"try{Typekit.load();}catch(e){};"}</script>
        </Head>
        <body>
          <div className="site">
            <div className="container">
              <Main />
              <NextScript />
            </div>
            <Footer />
          </div>
          <Fader />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
