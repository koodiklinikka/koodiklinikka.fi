import React from "react";
import request from "axios";
import chain from "lodash";
import timeago from "timeago";

import * as transformers from "../util";
import api from "../api";

function throwError(err) {
  setTimeout(() => {
    throw err;
  });
}

export default React.createClass({
  getInitialState() {
    return {
      messages: []
    };
  },
  componentDidMount() {
    request
      .get(api("feeds"))
      .then(res => {
        const messages = chain(res.data)
          .map((messages, type) => transformers[type](messages))
          .flatten()
          .value();
        this.setState({
          messages: chain(messages)
            .sortBy("timestamp")
            .reverse()
            .value()
            .slice(0, 40)
        });
      })
      .catch(throwError);
  },
  render() {
    const messages = this.state.messages.map((message, i) => {
      let image = <img src={message.image} />;

      if (message.imageLink) {
        image = (
          <a target="_blank" href={message.imageLink}>
            {image}
          </a>
        );
      }

      return (
        <div className="message" key={i}>
          <div className="message__image">{image}</div>
          <div className="message__content">
            <div className="message__user">
              <a href={message.userLink}>{message.user}</a>
            </div>
            <div
              className="message__body"
              dangerouslySetInnerHTML={{ __html: message.body }}
            />
            <div className="message__icon">
              <i className={`fa fa-${message.type}`} />
            </div>
            <div className="message__details">
              <span className="message__timestamp">
                {timeago(message.timestamp)}
              </span>
              <span className="message__meta">{message.meta}</span>
            </div>
          </div>
        </div>
      );
    });

    return <div className="feed">{messages}</div>;
  }
});
