import React from "react";
import "../styles/style.styl";
import "../styles/icons.less";
import Head from "next/head";
import InviteForm from "../components/InviteForm";
import Channels from "../components/Channels";
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
      <section className="signup">
        <div className="row">
          <h3>
            Tule mukaan{" "}
            <a
              href="https://slack.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Slack
            </a>
            -yhteisöömme
          </h3>
          <div className="form">
            <InviteForm />
          </div>
          <p className="code-of-conduct">
            Ennen liittymistä yhteisöömme varmista, että olet lukenut yhteisön{" "}
            <a
              href="https://github.com/koodiklinikka/code-of-conduct/blob/master/README.md"
              target="_blank"
              rel="noopener noreferrer"
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
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="channels-row">
        <div className="row">
          <h3>Suosituimmat keskustelunaiheet</h3>
          <Channels />
        </div>
      </section>
      <section>
        <div className="row">
          <div className="bread">
            <h3>Avoin lähdekoodi</h3>
            <p>
              Suosimme avointa lähdekoodia ja kaikki käyttämämme koodi on
              vapaasti saatavilla ja hyödynnettävissä{" "}
              <a
                href="https://github.com/koodiklinikka"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub-organisaatiomme sivulta
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
        <Feed />
      </div>
    </div>
  </>
);

const Index = () => (
  <React.Fragment>
    <Head>
      <title>Koodiklinikka</title>
    </Head>
    <Hero />
    <IndexContent />
  </React.Fragment>
);

export default Index;
