import "../styles/style.styl";
import Head from "next/head";
import InviteForm from '../components/InviteForm';
import Members from '../components/Members';
import Feed from '../components/Feed';

const Hero = () => (
  <div className="header">
    <video
      autoPlay
      loop
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
            <a target="_blank" href="https://slack.com/">
              Slack
            </a>
            -yhteisöömme
          </h3>
          <div className="form"><InviteForm /></div>
          <p className="code-of-conduct">
            Ennen liittymistä yhteisöömme varmista, että olet lukenut yhteisön{" "}
            <a
              target="_blank"
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
                <img src="/static/images/slack.png" />
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="bread">
            <div className="column column2-5">
              <img src="/static/images/octocat.png" />
            </div>
            <div className="column column3-5">
              <h3>Avoin lähdekoodi</h3>
              <p>
                Suosimme avointa lähdekoodia ja kaikki käyttämämme koodi on
                vapaasti saatavilla ja hyödynnettävissä{" "}
                <a href="https://github.com/koodiklinikka">
                  Github-organisaatiomme sivulta
                </a>
                . Organisaation jäseneksi otamme kaikki Slack-yhteisömme
                jäsenet. Koodiklinikan projekteihin voi osallistua kuka tahansa
                ja muutosideat ovat aina lämpimästi tervetulleita.
              </p>
              <div id="members">
                <Members />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <h2>Potilaiden projekteja</h2>
          <div className="bread">
            <div className="column column2-5">
              <a href="https://redom.js.org" target="_blank">
                <img src="/static/images/redom.svg" />
              </a>
            </div>
            <div className="column column3-5">
              <h4>RE:DOM</h4>
              <p>
                Tiny (2 KB) turboboosted JavaScript library for creating user
                interfaces. Develop web apps with 100 % JavaScript and web
                standards.
              </p>
            </div>
          </div>
          <div className="bread">
            <div className="column column2-5">
              <a href="https://codestats.net/" target="_blank">
                <img
                  src="/static/images/codestats.png"
                  className="project-image__codestats"
                />
              </a>
            </div>
            <div className="column column3-5">
              <h4>Code::Stats</h4>
              <p>
                Code::Stats is a free stats tracking service for programmers
              </p>
            </div>
          </div>
          <div className="bread">
            <div className="column column2-5">
              <a href="https://reactabular.js.org/" target="_blank">
                <img
                  src="/static/images/reactabular.png"
                  className="project-image__codestats"
                />
              </a>
            </div>
            <div className="column column3-5">
              <h4>Reactabular</h4>
              <p>A framework for building the React table you need</p>
            </div>
          </div>
          <div className="bread">
            <div className="column column2-5">
              <a href="https://avain.app" target="_blank">
                <img src="/static/images/avain.svg" style={{ width: "7rem" }} />
              </a>
            </div>
            <div className="column column3-5">
              <h4>Avain.app</h4>
              <p>Secure one-time password manager (PWA + Web Crypto)</p>
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
