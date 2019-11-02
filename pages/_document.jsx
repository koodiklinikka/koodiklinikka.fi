import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { Footer } from "../components/Footer";
import Fader from "../components/Fader";
import ReactGA from "react-ga";

function trackPageView() {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    return;
  }
  if (!window.GA_INITIALIZED) {
    ReactGA.initialize("UA-58806132-1");
    window.GA_INITIALIZED = true;
  }
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  componentDidMount() {
    trackPageView();
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
          <link rel="manifest" href="/static/icons/site.webmanifest" />
          <meta property="og:image" content="images/logo.png" />
        </Head>
        <body>
          <div className="site">
            <div className="container">
              <Main />
            </div>
            <Footer />
          </div>
          <Fader />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
