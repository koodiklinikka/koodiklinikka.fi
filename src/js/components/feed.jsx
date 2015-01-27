'use strict';

var React = require('react');
var faker = require('faker');
var _ = require('lodash');

module.exports = React.createClass({
  getInitialState() {
    return {
      messages: _.range(10).map(() => {
        return {
          image: faker.image.avatar(),
          body: faker.hacker.phrase(),
          timestamp: faker.date.recent(),
          type: _.sample(['twitter', 'slack', 'github']),
          meta: `Retweeted by @${faker.internet.userName()}`
        }
      })
    };
  },
  componentDidMount() {
  },
  render() {
    var messages = this.state.messages.map((message) => {
      return (
        <div className="message">
          <img className="message__image" src={message.image} />
          <div className="message__content">
            <div className="message__body">{message.body}</div>
            <div className="message__icon">
              <i className={`fa fa-${message.type}`}></i>
            </div>
            <div className="message__details">
              <span className="message__timestamp">
                {require('timeago')(message.timestamp)}
              </span>
              <span className="message__meta">{message.meta}</span>
            </div>
          </div>
        </div>
      )
    });

    return (
      <div className="feed">{messages}</div>
    )
  }
});
