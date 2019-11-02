import React from "react";
import "../styles/style.styl";
import "../styles/icons.less";
import Head from "next/head";
import InviteForm from "../components/InviteForm";
import Members from "../components/Members";
import Feed from "../components/Feed";

const Hero = () => (
  <div className="header">
    <video
      autoPlay
      loop
      muted
      poster="/static/images/poster.jpg"
      className="header__video-bg"
    >
      <source src="/static/videos/jumbo.mp4" type="video/mp4" />
    </video>
    <div className="header__container">
      <div className="header__nav">
        <a href="/">
          <img src="/static/images/logo-new.svg" alt="Etusivu" />
        </a>
      </div>
      <div className="header__headline">
        <h1 className="header__title">
          Yhteisö kaikille ohjelmoinnista ja ohjelmistoalasta kiinnostuneille
          harrastajille ja ammattilaisille.
        </h1>
      </div>
    </div>
  </div>
);

const IndexContent = () => (
  <>
    <div className="content with-feed">
      <section>
        <div className="row">
          <h3>
            Tule mukaan{" "}
            <a
              target="_blank"
              href="https://slack.com/"
              rel="noopener noreferrer"
            >
              Slack
            </a>
            -yhteisöömme
          </h3>
          <div className="form">
            <InviteForm/>
          </div>
          <p className="code-of-conduct">
            Ennen liittymistä yhteisöömme varmista, että olet lukenut yhteisön{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/koodiklinikka/code-of-conduct/blob/master/README.md"
            >
              käyttäytymissäännöt
            </a>
            .
          </p>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="bread">
            <div className="column column1-2">
              <h3>Yhteisö ohjelmoinnista kiinnostuneille</h3>
              <p>
                Koodiklinikka on Suomen suurin ohjelmistoalan yhteisö, joka
                kokoaa työntekijät, harrastajat ja vasta-alkajat yhteen.{"\n"}
                Tarkoituksenamme on yhdistää ja kasvattaa suomalaista
                ohjelmointiyhteisöä, sekä tarjota apua ja uusia kontakteja
                ohjelmoinnista innostuneille nuorille.
              </p>
              <p>
                Mukaan liittyminen on ilmaista ja helppoa. Jätä
                sähköpostiosoitteesi ylläolevaan kenttään ja lähetämme sinulle
                kutsun Slack-yhteisöömme.
              </p>
            </div>
            <div className="column column1-2">
              <a href="/static/images/slack.png" target="_blank">
                <img
                  src="/static/images/slack.png"
                  alt="Slack app at Koodiklinikka"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="bread">
            <div className="column column5-5">
              <h3>Suosituimmat keskustelunaiheet</h3>
              <p>
                <ul>
                  <li>
                    <a
                      href="https://app.slack.com/client/T03BQ3NU9/C03BQ3NUX"
                      target="_blank"
                    >
                      #yleinen
                    </a>{" "}
                    – Yleistä keskustelu ohjelmistoalasta
                  </li>
                  <li>
                    <a
                      href="https://app.slack.com/client/T03BQ3NU9/C66UM4J82"
                      target="_blank"
                    >
                      #rekry
                    </a>{" "}
                    – Avoimet työpaikat
                  </li>
                  <li>
                    <a
                      href="https://app.slack.com/client/T03BQ3NU9/C03PTV5LN"
                      target="_blank"
                    >
                      #javascript
                    </a>{" "}
                    – Keskustelua JavaScriptistä, frontendistä ja paljosta
                    muusta
                  </li>
                  <li>
                    <a
                      href="https://app.slack.com/client/T03BQ3NU9/C043VSQ0S"
                      target="_blank"
                    >
                      #fp
                    </a>{" "}
                    – Keskustelua funktionaalisesta ohjelmoinnista, oli se
                    sitten Clojurea, Haskellia, F#:ia tai muuta herkkua
                  </li>
                  <li>
                    <a
                      href="https://app.slack.com/client/T03BQ3NU9/C043VSQ0S"
                      target="_blank"
                    >
                      #devops
                    </a>{" "}
                    – Devaavat operaattorit ja muuta hypeä
                  </li>
                  <li>
                    <a
                      href="https://app.slack.com/client/T03BQ3NU9/C0432KDDN"
                      target="_blank"
                    >
                      #tapahtumat
                    </a>{" "}
                    – Kiinnostaako alan tapahtumat? Täällä kuulet niistä
                    ensimmäisenä
                  </li>
                  <li>
                    <a
                      href="https://app.slack.com/client/T03BQ3NU9/C5K197THA/"
                      target="_blank"
                    >
                      #homeautomation
                    </a>{" "}
                    – Taloautomaatio, KNX, Loxone, Openhab, älyvalot, Home
                    Assistant, Hue, Trådfri, Xiaomi jne.
                  </li>
                  <li>
                    <a
                      href="https://app.slack.com/client/T03BQ3NU9/C6K2UL9SQ"
                      target="_blank"
                    >
                      #sijoitukset
                    </a>{" "}
                    – Keskustelua sijoittamisesta
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="bread">
            <h3>Avoin lähdekoodi</h3>
            <p>
              Suosimme avointa lähdekoodia ja kaikki käyttämämme koodi on
              vapaasti saatavilla ja hyödynnettävissä{" "}
              <a href="https://github.com/koodiklinikka">
                Github-organisaatiomme sivulta
              </a>
              . Organisaation jäseneksi otamme kaikki Slack-yhteisömme jäsenet.
              Koodiklinikan projekteihin voi osallistua kuka tahansa ja
              muutosideat ovat aina lämpimästi tervetulleita.
            </p>
            <div id="members">
              <Members />
            </div>
          </div>
        </div>
      </section>
      <div id="feed">
        <Feed/>
      </div>
    </div>
  </>
);

const Index = () => (
  <React.Fragment>
    <Head>
      <title>Koodiklinikka</title>
    </Head>
    <Hero/>
    <IndexContent/>
  </React.Fragment>
);

export default Index;
