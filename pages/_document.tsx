import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { Footer } from "../components/Footer";
import Fader from "../components/Fader";
import ReactGA from "react-ga";
import fs from "fs";
import path from "path";

class CustomNextHead extends Head {
  // TODO: This might not be needed if Next.js implements built-in support
  // https://github.com/zeit/next-plugins/issues/364
  getCssLinks({ allFiles }) {
    return allFiles
      .filter(file => file.endsWith(".css"))
      .map(file => (
        <style
          key={file}
          nonce={this.props.nonce}
          dangerouslySetInnerHTML={{
            __html: fs.readFileSync(path.join(".next", file), "utf-8"),
          }}
        />
      ));
  }
}

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
        <CustomNextHead />
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
