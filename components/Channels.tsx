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
      title="Link to Slack channel"
    >
      <div className="channel__icon"></div>
      <span className="channel__name">{name}</span>
      <div className="channel__description">{description}</div>
      <div className="channel__arrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="16"
          viewBox="0 0 24 16"
        >
          <path d="M14 1l8.5 7m0 0L14 15m8.5-7H0"></path>
        </svg>
      </div>
    </a>
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
