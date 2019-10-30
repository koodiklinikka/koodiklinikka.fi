import _ from "lodash";
import React from "react";
import request from "axios";
import api from "./api";
import transformers from "./feed-transformers";
import ReactTimeAgo from "react-time-ago";
import JavascriptTimeAgo from "javascript-time-ago";
import timeagoFi from "javascript-time-ago/locale/fi";
JavascriptTimeAgo.locale(timeagoFi);

export default class Feed extends React.Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    this.updateFeed();
  }

  async updateFeed() {
    const res = await request.get(api("feeds"));
    const messages = _(res.data)
      .map((messages, type) => transformers[type](messages))
      .flatten()
      .value();

    this.setState({
      messages: _(messages)
        .sortBy("timestamp")
        .reverse()
        .value()
        .slice(0, 40),
    });
  }

  render() {
    const messages = this.state.messages.map((message, i) => {
      let image = <img src={message.image} alt="" />;

      if (message.imageLink) {
        image = (
          <a
            target="_blank"
            href={message.imageLink}
            rel="noopener noreferrer"
            tabIndex="-1"
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
            ></div>
            <div className="message__icon">
              <i className={`fa fa-${message.type}`}></i>
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
