'use strict';
require('./ga');

var React = require('react');

React.render(
  require('./components/inviteForm')(),
  document.getElementById('invite-form'));

React.render(
  require('./components/fader')(),
  document.getElementById('fader'));


React.render(
  require('./components/members')(),
  document.getElementById('members'));


React.render(
  require('./components/feed')(),
  document.getElementById('feed'));
