import flatMap from "lodash/flatMap";
import sortBy from "lodash/sortBy";
import React from "react";
import request from "axios";
import api from "./api";
import transformers from "./feed-transformers";
import ReactTimeAgo from "react-time-ago";
import JavascriptTimeAgo from "javascript-time-ago";
import timeagoFi from "javascript-time-ago/locale/fi";

// TODO: Add type definitions for javascript-time-ago
(JavascriptTimeAgo as any).locale(timeagoFi);

export default class Feed extends React.Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    this.updateFeed();
  }

  async updateFeed() {
    const res = await request.get(api("feeds"));
    const messages = sortBy(
      flatMap(res.data, (messages, type) => transformers[type](messages)),
      "timestamp"
    );
    messages.reverse(); // In-place
    this.setState({
      messages: messages.slice(0, 40),
    });
  }

  render() {
    const messages = this.state.messages.map((message, i) => {
      let image = <img src={message.image} alt="" loading="lazy" />;

      if (message.imageLink) {
        image = (
          <a
            target="_blank"
            href={message.imageLink}
            rel="noopener noreferrer"
            tabIndex={-1}
          >
            {image}
          </a>
        );
      }

      return (
        <div className="message" key={i}>
          <div className="message__image" aria-hidden="true">
            {image}
          </div>
          <div className="message__content">
            <div className="message__user">
              <a href={message.userLink}>{message.user}</a>
            </div>
            <div
              className="message__body"
              dangerouslySetInnerHTML={{ __html: message.body }}
            />
            <div className="message__icon">
              <i className={`fa fa-${message.type}`} aria-hidden="true" />
            </div>
            <div className="message__details">
              <span className="message__timestamp">
                <ReactTimeAgo date={message.timestamp} locale="fi" />
              </span>
              <span className="message__meta">{message.meta}</span>
            </div>
          </div>
        </div>
      );
    });

    return <div className="feed">{messages}</div>;
  }
}
