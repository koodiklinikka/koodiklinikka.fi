'use strict';

var githubEvent = require('parse-github-event');
var twitterText = require('twitter-text');

module.exports = {
  github(item) {
    var message = githubEvent.parse(item);
    console.log(item);
    console.log(message.data);
    return {
      image: item.actor.avatar_url,
      body: `${item.actor.login} ${message.text}`,
      timestamp: item.created_at,
      url: message.url,
      highlights: message.data,
      type: 'github'
    };
  },
  twitter(item) {
    return {
      image: item.user.profile_image_url,
      body: twitterText.autoLink(item.text),
      timestamp: item.created_at,
      type: 'twitter'
    };
  }
};
