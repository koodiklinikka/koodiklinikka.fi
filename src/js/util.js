'use strict';

var _           = require('lodash');
var twitterText = require('twitter-text');

module.exports = {
  twitter(items) {
    return items.map((item) => {
      if(item.retweeted) {
        item = item.retweeted_status;
      }

      var url = `https://twitter.com/${item.user.screen_name}`;

      return {
        user: `@${item.user.screen_name}`,
        userLink: url,
        image: item.user.profile_image_url_https,
        imageLink: url,
        body: twitterText.autoLink(item.text),
        timestamp: new Date(item.created_at),
        type: 'twitter'
      };
    });
  }
};
