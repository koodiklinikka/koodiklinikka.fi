import React from "react";
import Head from "next/head";
import { PromiseType } from "utility-types";
import "../styles/style.styl";
import "../styles/icons.less";
import InviteForm from "../components/InviteForm";
import Members from "../components/Members";
import Feed from "../components/Feed";
import { getChannels } from "../data/channels";
import emoji from "emoji-dictionary";
import ReactMarkdown from "react-markdown";

const slackMarkdownRenderer = (text: { value: string }) => {
  const emojiText = text.value.replace(/:\w+:/gi, (name) =>
    emoji.getUnicode(name)
  );

  return (
    <span>
      {emojiText.split(/(<#[A-Z0-9]+\|[A-Za-z0-9]+>)/).map((str) => {
        const matches = str.match(/<#([A-Z0-9]+)\|([A-Za-z0-9]+)>/);
        if (matches) {
          return (
            <a href={`https://app.slack.com/client/T03BQ3NU9/${matches[1]}`}>
              {matches[2]}
            </a>
          );
        }
        return str;
      })}
    </span>
  );
};

export async function getStaticProps() {
  const allChannels = await getChannels();
  const channels = allChannels
    .sort((a, b) => b.num_members - a.num_members)
    .sort((a, b) => b.unique_members_today - a.unique_members_today)
    .slice(0, 10);

  return {
    props: {
      channels: channels,
    },
    revalidate: 3600,
  };
}

type IndexProps = PromiseType<ReturnType<typeof getStaticProps>>["props"];

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

const IndexContent = (props: IndexProps) => (
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
            <InviteForm />
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
              <h3>Suosituimmat keskustelunaiheet tänään</h3>
              <p>
                <table className="channels">
                  <tbody>
                    {props.channels.map((channel) => (
                      <tr key={channel.id}>
                        <td>
                          <div>
                            <a
                              href={`https://app.slack.com/client/T03BQ3NU9/${channel.id}`}
                              target="_blank"
                              className="channel"
                            >
                              #{channel.name}
                            </a>
                          </div>
                          <span className="channel-members">
                            {channel.num_members} jäsentä
                          </span>
                        </td>
                        <td>
                          <span>
                            <ReactMarkdown
                              className="channel-topic"
                              source={channel.topic}
                              renderers={{ text: slackMarkdownRenderer }}
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
        <Feed />
      </div>
    </div>
  </>
);

const Index = (props: IndexProps) => (
  <React.Fragment>
    <Head>
      <title>Koodiklinikka</title>
    </Head>
    <Hero />
    <IndexContent {...props} />
  </React.Fragment>
);

export default Index;
