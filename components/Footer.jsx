import React from "react";
import EmailComponent from "./EmailComponent";
import sponsors from "../data/sponsors";
const SponsorLink = ({ href, name }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <img
      src={`/static/images/sponsors/${name}.${
        name === "Nordea" ? "png" : "svg"
      }`}
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
        {sponsors.map(sponsor => (
          <SponsorLink key={sponsor.id} {...sponsor} />
        ))}
      </div>
      <div className="contacts">
        <div>
          <a href="https://koodiklinikka.slack.com" aria-label="Koodiklinikka Slackissä">
            <i className="fa fa-slack" aria-hidden="true" />
          </a>
          <a href="https://github.com/koodiklinikka/koodiklinikka.fi"  aria-label="Koodiklinikka Githubissa">
            <i className="fa fa-github" aria-hidden="true" />
          </a>
          <a href="https://twitter.com/koodiklinikka" aria-label="Koodiklinikka Twitterissä">
            <i className="fa fa-twitter" aria-hidden="true" />
          </a>
          <a href="https://www.linkedin.com/groups/12025476" aria-label="Koodiklinikka Linkedinissä">
            <i className="fa fa-linkedin" aria-hidden="true" />
          </a>
          <a href="https://www.facebook.com/koodiklinikka" aria-label="Koodiklinikka Facebookissa">
            <i className="fa fa-facebook" aria-hidden="true" />
          </a>
          <div id="email">
            <EmailComponent />
          </div>
        </div>
      </div>
    </footer>
  );
}
