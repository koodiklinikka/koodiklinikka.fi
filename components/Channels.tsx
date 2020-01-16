import React from "react";
import channels from "../data/channels";

type Props = {
  href: string;
  name: string;
  description: string;
  key: string;
};

const ChannelLink = ({ href, name, description }: Props) => (
  <li className="channel">
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="channel__name"
      title="Link to Slack channel"
    >
      {name}<span className="channel__arrow">→</span>
    </a>{" "}
    <div className="channel__description">
      {description}
    </div>
  </li>
);

export default function Channels() {
  return (
    <ul className="channels">
      {channels.map(channel => (
        <ChannelLink key={channel.name} {...channel} />
      ))}
    </ul>
  );
}
