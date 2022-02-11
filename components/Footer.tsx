import React from "react";
import EmailComponent from "./EmailComponent";
import sponsors from "../data/sponsors";

type Props = {
  href: string;
  name: string;
  title?: string;
};

const SponsorLink = ({ href, name }: Props) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <img
      src={`/static/images/sponsors/${name.toLowerCase()}.svg`}
      alt={name}
      className={`sponsor sponsor__${name.toLowerCase()}`}
      loading="lazy"
    />
  </a>
);

const SocialLink = ({ href, name, title }: Props) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={title}>
    <img
      src={`/static/images/social/${name.toLowerCase()}.svg`}
      alt={title}
      className={`social social__${name.toLowerCase()}`}
      loading="lazy"
    />
  </a>
);

export function Footer() {
  return (
    <footer>
      <div className="sponsors">
        <div className="sponsors__label">Yhteistyössä</div>
        {sponsors.map((sponsor) => (
          <SponsorLink key={sponsor.name} {...sponsor} />
        ))}
      </div>
      <div className="contacts">
        <div>
          <SocialLink
            href="https://koodiklinikka.slack.com"
            title="Koodiklinikka Slackissä"
            name="slack"
          />
          <SocialLink
            href="https://github.com/koodiklinikka"
            title="Koodiklinikka Githubissa"
            name="github"
          />
          <SocialLink
            href="https://twitter.com/koodiklinikka"
            title="Koodiklinikka Twitterissä"
            name="twitter"
          />
          <SocialLink
            href="https://www.linkedin.com/groups/12025476"
            title="Koodiklinikka Linkedinissä"
            name="linkedin"
          />
          <SocialLink
            href="https://www.facebook.com/koodiklinikka"
            title="Koodiklinikka Facebookissa"
            name="facebook"
          />
          <div id="email">
            <EmailComponent />
          </div>
        </div>
      </div>
    </footer>
  );
}
