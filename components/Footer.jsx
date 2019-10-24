import React from "react";
import EmailComponent from "./EmailComponent";

const SponsorLink = ({ href, id, name }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <img
      src={`/static/images/sponsors/${id}.${id === "nordea" ? "png" : "svg"}`}
      alt={name}
      className={`sponsor sponsor__${id}`}
    />
  </a>
);

export function Footer() {
  return (
    <footer>
      <div className="sponsors">
        <div className="sponsors__label">Yhteistyössä</div>
        <SponsorLink
          id="futurice"
          name="Futurice"
          href="http://futurice.com/"
        />
        <SponsorLink
          id="metosin"
          name="Metosin"
          href="http://www.metosin.fi/"
        />
        <SponsorLink id="solita" name="Solita" href="https://www.solita.fi/" />
        <SponsorLink id="wakeone" name="Wakeone" href="http://wakeone.co/" />
        <SponsorLink id="nordea" name="Nordea" href="https://www.nordea.com/" />
      </div>
      <div className="contacts">
        <div>
          <a href="https://koodiklinikka.slack.com">
            <i className="fa fa-slack" />
          </a>
          <a href="https://github.com/koodiklinikka/koodiklinikka.fi">
            <i className="fa fa-github" />
          </a>
          <a href="https://twitter.com/koodiklinikka">
            <i className="fa fa-twitter" />
          </a>
          <a href="https://www.linkedin.com/groups/12025476">
            <i className="fa fa-linkedin" />
          </a>
          <a href="https://www.facebook.com/koodiklinikka">
            <i className="fa fa-facebook" />
          </a>
          <div id="email">
            <EmailComponent />
          </div>
        </div>
      </div>
    </footer>
  );
}
