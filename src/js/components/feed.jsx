'use strict';

var React = require('react');
var request = require('axios');
var _ = require('lodash');

var transformers = require('../util');

function throwError(err) {
  setTimeout(() => {
    console.log(err.stack);
    throw err;
  });
}

module.exports = React.createClass({
  getInitialState() {
    return {
      messages: []
    };
  },
  componentDidMount() {
    request.get('/api/feeds').then((res) => {

      var feeds = res.data;
      var messages = [];
      for(var type in feeds) {
        var feedMessages = feeds[type].map(transformers[type]);
        messages = messages.concat(feedMessages);
      }

      this.setState({
        messages: _(messages).sortBy('timestamp').reverse().value().slice(0, 40)
      });
    }).catch(throwError);
  },
  render() {
    var messages = this.state.messages.map((message) => {

      var image = <img src={message.image} />;

      if(message.imageLink) {
        image = <a target="_blank" href={message.imageLink}>{image}</a>;
      }

      return (
        <div className="message">
          <div className="message__image">{image}</div>
          <div className="message__content">
            <div className="message__user">
              <a href={message.userLink}>{message.user}</a>
            </div>
            <div className="message__body" dangerouslySetInnerHTML={{__html:message.body}}></div>
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
