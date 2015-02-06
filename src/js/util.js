'use strict';

var _           = require('lodash');
var githubEvent = require('parse-github-event');
var twitterText = require('twitter-text');

module.exports = {
  github(item) {

    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    var template = _.template(githubEvent.parse(item).text);

    var repository = `https://github.com/${item.repo.name}`;
    var branch;
    if(item.payload.ref) {
      branch = item.payload.ref.replace('refs/heads/', '');
    }

    var message = template({
      repository: `<a target="_blank" href="${repository}">${item.repo.name}</a>`,
      branch: branch,
      number: item.payload.number,
      ref_type: item.payload.ref
    });

    return {
      image: item.actor.avatar_url,
      imageLink: `//githubEvent.com/${item.actor.login}`,
      body: `${item.actor.login} ${message}`,
      timestamp: new Date(item.created_at),
      url: message.url,
      type: 'github'
    };
  },
  twitter(item) {

    if(item.retweeted) {
      item = item.retweeted_status;
    }

    return {
      image: item.user.profile_image_url,
      imageLink: `//twitter.com/${item.user.screen_name}`,
      body: twitterText.autoLink(item.text),
      timestamp: new Date(item.created_at),
      type: 'twitter'
    };
  }
};
