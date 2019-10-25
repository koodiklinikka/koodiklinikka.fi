import React from "react";
import EmailComponent from "./EmailComponent";
import sponsors from "../data/sponsors"
const SponsorLink = ({ href, name }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <img
      src={`/static/images/sponsors/${name}.${name === "Nordea" ? "png" : "svg"}`}
      alt={name}
      className={`sponsor sponsor__${name.toLowerCase()}`}
    />
  </a>
);

export function Footer() {
  return (
    <footer>
      <div className="sponsors">
        <div className="sponsors__label">Yhteistyössä</div>
        {sponsors.map(sponsor => <SponsorLink key={sponsor.id} {...sponsor} />)}
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
