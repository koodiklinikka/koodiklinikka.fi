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
  componentDidMount() {
    trackPageView();
  }

  render() {
    return (
      <Html lang="fi">
        <Head />
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
