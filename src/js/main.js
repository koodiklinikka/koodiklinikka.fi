'use strict';
require('./ga');

var React = require('react');

var inviteForm = React.createFactory(require('./components/inviteForm'));
var fader = React.createFactory(require('./components/fader'));
var members = React.createFactory(require('./components/members'));
var feed = React.createFactory(require('./components/feed'));
var email = React.createFactory(require('./components/email'));

React.render(
  inviteForm(),
  document.getElementById('invite-form'));

React.render(
  fader(),
  document.getElementById('fader'));


React.render(
  members(),
  document.getElementById('members'));


React.render(
  feed(),
  document.getElementById('feed'));

React.render(
  email(),
  document.getElementById('email'));
